import React, { useState } from 'react';

const User = () => {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');

    const fetchUserGreeting = async () => {

        // Check if the name is empty

        if (!name.trim()) {

            // If the name is empty, set a message asking for input

            setGreeting('Пожалуйста, введите Ваше имя');

            return; // Exit the function early

        }


        try {

            const response = await fetch(`http://localhost:8083/api/user?name=${name}`);

            if (!response.ok) {

                throw new Error('Network response was not ok');

            }

            const data = await response.text();

            setGreeting(data);

        } catch (error) {

            console.error('Fetch error:', error);

            setGreeting('Ошибка при получении приветствия');

        }

    };
    return (
        <div>
            <h2>Давайте знакомиться</h2>
            <input
                type="text"
                placeholder="Введите своё имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={fetchUserGreeting}>Поприветствовать</button>
            <p>Сообщение: {greeting}</p>
        </div>
    );
};

export default User;