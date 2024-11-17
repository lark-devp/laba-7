import React, { useState } from 'react';

const Count = () => {
    const [count, setCount] = useState(0); // Состояние для хранения значения счётчика
    const [inputValue, setInputValue] = useState(''); // Состояние для хранения значения из input
    const [error, setError] = useState(null); // Состояние для хранения ошибок
    const [isCountVisible, setIsCountVisible] = useState(false); // Состояние для управления видимостью счётчика

    // Функция для получения текущего значения счётчика
    const fetchCount = async () => {
        try {
            const response = await fetch('http://localhost:8081/count');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text();
            setCount(parseInt(data, 10)); // Преобразуем строку в число
            setIsCountVisible(true); // Показываем счётчик
            setError(null); // Сбрасываем ошибку

            // Hide the counter after 1,5 seconds
            setTimeout(() => {
                setIsCountVisible(false);
            }, 1500);
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Ошибка при получении счётчика'); // Устанавливаем сообщение об ошибке
        }
    };

    // Функция для увеличения счётчика
    const incrementCount = async () => {
        const valueToAdd = parseInt(inputValue, 10); // Преобразуем введённое значение в число
        if (isNaN(valueToAdd) || valueToAdd <= 0) {
            setError('Введите положительное число'); // Проверка на корректность введённого значения
            return;
        }

        try {
            await fetch('http://localhost:8081/count', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ count: valueToAdd }), // Увеличиваем на введённое значение
            });
            setIsCountVisible(false); // Скрываем счётчик после увеличения
            setInputValue(''); // Очищаем поле ввода
            setError(null); // Сбрасываем ошибку
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Ошибка при увеличении счётчика'); // Устанавливаем сообщение об ошибке
        }
    };

    return (
        <div>
            <h2>Счётчик</h2>
            <button onClick={fetchCount}>Получить счётчик</button>
            <div>
                <input 
                    type="number" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Введите число"
                />
                <button onClick={incrementCount}>Увеличить счётчик</button>
            </div>
            {isCountVisible && <p>Счётчик: {count}</p>} {/* Отображаем счётчик только если он видим */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибки */}
        </div>
    );
};

export default Count;