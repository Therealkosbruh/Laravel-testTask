<?php

// namespace App\Http\Controllers;

// use App\Http\Requests\OrderRequest;
// use App\Models\Order;
// use App\Models\Ration;
// use App\Models\Tariff;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\DB;

// class OrderController extends Controller
// {
    // public function store(OrderRequest $request)
    // {
    //     $validated = $request->validated();

    //     return DB::transaction(function () use ($validated) {
    //         // Создаём заказ
    //         $order = Order::create([
    //             'client_name'   => $validated['client_name'],
    //             'client_phone'  => $validated['client_phone'],
    //             'tariff_id'     => $validated['tariff_id'],
    //             'schedule_type' => $validated['schedule_type'],
    //             'comment'       => $validated['comment'] ?? null,
    //             'first_date'    => $validated['first_date'],
    //             'last_date'     => $validated['last_date'],
    //         ]);

    //         // Генерируем рационы питания
    //         $this->generateRations($order, $validated['delivery_ranges']);

    //         return response()->json(['message' => 'Заказ успешно создан', 'order' => $order], 201);
    //     });
    // }

//     private function generateRations(Order $order, array $deliveryRanges)
//     {
//         $tariff = Tariff::findOrFail($order->tariff_id);
//         $cookingDayBefore = $tariff->cooking_day_before;
//         $scheduleType = $order->schedule_type;
//         $rations = [];

//         foreach ($deliveryRanges as $range) {
//             $currentDate = $range['from'];

//             while ($currentDate <= $range['to']) {
//                 if ($scheduleType === 'EVERY_DAY') {
//                     $rations[] = $this->createRationData($order->id, $currentDate, $cookingDayBefore);
//                     $currentDate = date('Y-m-d', strtotime($currentDate . ' +1 day'));
//                 } elseif ($scheduleType === 'EVERY_OTHER_DAY') {
//                     $rations[] = $this->createRationData($order->id, $currentDate, $cookingDayBefore);
//                     $currentDate = date('Y-m-d', strtotime($currentDate . ' +2 days'));
//                 } elseif ($scheduleType === 'EVERY_OTHER_DAY_TWICE') {
//                     $rations[] = $this->createRationData($order->id, $currentDate, $cookingDayBefore);
//                     if ($currentDate !== $range['to']) {
//                         $rations[] = $this->createRationData($order->id, $currentDate, $cookingDayBefore);
//                     }
//                     $currentDate = date('Y-m-d', strtotime($currentDate . ' +2 days'));
//                 }
//             }
//         }

//         // Массово создаём записи в БД
//         Ration::insert($rations);
//     }

//     private function createRationData(int $orderId, string $deliveryDate, bool $cookingDayBefore): array
//     {
//         return [
//             'order_id'      => $orderId,
//             'delivery_date' => $deliveryDate,
//             'cooking_date'  => $cookingDayBefore ? date('Y-m-d', strtotime($deliveryDate . ' -1 day')) : $deliveryDate,
//             'created_at'    => now(),
//             'updated_at'    => now(),
//         ];
//     }

//     public function index()
//     {
//         $orders = Order::with('rations', 'tariff')->get();
//         return response()->json($orders);
//     }

//     public function show(Order $order)
//     {
//         return response()->json($order->load('rations', 'tariff'));
//     }
// }
namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Models\Ration;
use App\Models\Tariff;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;
use Illuminate\Http\Exceptions\HttpResponseException;

class OrderController extends Controller
{
    public function store(OrderRequest $request): JsonResponse
{
    try {
        $validated = $request->validated();

        return DB::transaction(function () use ($validated) {
            $order = Order::create([
                'client_name'   => $validated['client_name'],
                'client_phone'  => $validated['client_phone'],
                'tariff_id'     => $validated['tariff_id'],
                'schedule_type' => $validated['schedule_type'],
                'comment'       => $validated['comment'] ?? null,
                'first_date'    => $validated['first_date'],
                'last_date'     => $validated['last_date'],
            ]);

            $this->generateRations($order, $validated['delivery_ranges']);

            return response()->json(['message' => 'Заказ успешно создан', 'order' => $order], 201);
        });
    } catch (Throwable $e) {
        return response()->json([
            'message' => 'Ошибка при создании заказа',
            'error'   => $e->getMessage(),
        ], 500);
    }
}

    private function generateRations(Order $order, array $deliveryRanges): void
    {
        $tariff = Tariff::find($order->tariff_id);

        if (!$tariff) {
            abort(400, 'Тариф не найден');
        }

        $cookingDayBefore = $tariff->cooking_day_before;
        $scheduleType = $order->schedule_type;
        $rations = [];

        foreach ($deliveryRanges as $range) {
            $currentDate = $range['from'];

            while ($currentDate <= $range['to']) {
                $rations[] = $this->createRationData($order->id, $currentDate, $cookingDayBefore);

                if ($scheduleType === 'EVERY_DAY') {
                    $currentDate = date('Y-m-d', strtotime($currentDate . ' +1 day'));
                } elseif ($scheduleType === 'EVERY_OTHER_DAY' || $scheduleType === 'EVERY_OTHER_DAY_TWICE') {
                    $currentDate = date('Y-m-d', strtotime($currentDate . ' +2 days'));
                }
            }
        }

        Ration::insert($rations);
    }

    private function createRationData(int $orderId, string $deliveryDate, bool $cookingDayBefore): array
    {
        return [
            'order_id'      => $orderId,
            'delivery_date' => $deliveryDate,
            'cooking_date'  => $cookingDayBefore ? date('Y-m-d', strtotime($deliveryDate . ' -1 day')) : $deliveryDate,
            'created_at'    => now(),
            'updated_at'    => now(),
        ];
    }

    public function index(): JsonResponse
    {
        $orders = Order::with('rations', 'tariff')->get();
        return response()->json($orders);
    }

    public function show(Order $order): JsonResponse
    {
        return response()->json($order->load('rations', 'tariff'));
    }
}
