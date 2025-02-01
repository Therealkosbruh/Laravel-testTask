import React, { useState, useEffect } from 'react';
import styles from '../css/OrderForm.module.css';
import { axiosClient } from '../axios-client';

export const CreateOrder = () => {
  const [tariffs, setTariffs] = useState([]);
  const [form, setForm] = useState({
    client_name: '',
    client_phone: '',
    tariff_id: '',
    schedule_type: 'EVERY_DAY',
    comment: '',
    delivery_ranges: [{ from: '', to: '' }],
  });

  useEffect(() => {
    axiosClient.get('/tariffs')
      .then(({ data }) => setTariffs(data))
      .catch((err) => console.error('Ошибка загрузки тарифов:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.delivery_ranges.length) {
      alert("Добавьте хотя бы один промежуток дат!");
      return;
    }
  
    const firstDate = form.delivery_ranges[0]?.from || "";
    const lastDate = form.delivery_ranges[form.delivery_ranges.length - 1]?.to || "";
  
    if (!firstDate || !lastDate) {
      alert("Заполните даты!");
      return;
    }
  
    const requestData = {
      ...form,
      first_date: firstDate,
      last_date: lastDate,
    };
    
    console.log(requestData.first_date);
    console.log(requestData.last_date);

    try {
      const { data } = await axiosClient.post('/orders', requestData);
      alert('Заказ успешно создан!');
      window.location.reload();
    } catch (error) {
      console.error('❌ Ошибка запроса:', error);
      if (error.response) {
        alert(error.response.data);
      } else {
        alert('Ошибка сети');
      }
    }
  };
  ;

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Оформление заказа</h2>
      <input
        type="text"
        name="client_name"
        placeholder="ФИО клиента"
        value={form.client_name}
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        type="text"
        name="client_phone"
        placeholder="Телефон (79991112233)"
        value={form.client_phone}
        onChange={handleChange}
        className={styles.inputField}
      />
      <select
        name="tariff_id"
        value={form.tariff_id}
        onChange={handleChange}
        className={styles.inputField}
      >
        <option value="">Выберите тариф</option>
        {tariffs.map((tariff) => (
          <option key={tariff.id} value={tariff.id}>{tariff.ration_name}</option>
        ))}
      </select>
      <select
        name="schedule_type"
        value={form.schedule_type}
        onChange={handleChange}
        className={styles.inputField}
      >
        <option value="EVERY_DAY">Каждый день</option>
        <option value="EVERY_OTHER_DAY">Через день</option>
        <option value="EVERY_OTHER_DAY_TWICE">Через день на 2 дня</option>
      </select>
      <textarea
        name="comment"
        placeholder="Комментарий"
        value={form.comment}
        onChange={handleChange}
        className={styles.inputField}
      />
      {form.delivery_ranges.map((range, index) => (
        <div key={index} className={styles.dateRangeContainer}>
          <input
            type="date"
            value={range.from}
            onChange={(e) => {
              const newRanges = [...form.delivery_ranges];
              newRanges[index].from = e.target.value;
              setForm({ ...form, delivery_ranges: newRanges });
            }}
            className={styles.inputField}
          />
          <input
            type="date"
            value={range.to}
            onChange={(e) => {
              const newRanges = [...form.delivery_ranges];
              newRanges[index].to = e.target.value;
              setForm({ ...form, delivery_ranges: newRanges });
            }}
            className={styles.inputField}
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  delivery_ranges: form.delivery_ranges.filter((_, i) => i !== index),
                })
              }
              className={styles.deleteButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path>
                <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path>
              </svg>
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setForm({ ...form, delivery_ranges: [...form.delivery_ranges, { from: '', to: '' }] })
        }
        className={styles.addButton}
      >+ Добавить промежуток</button>
      <button type="submit" className={styles.submitButton}>Оформить заказ</button>
    </form>
  );
};
