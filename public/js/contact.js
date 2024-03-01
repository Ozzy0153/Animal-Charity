document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.onsubmit = function (e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form).entries());

        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                showNotification(data.message);
            })
            .catch(error => {
                showNotification('There was a problem with your submission. Please try again.', true);
            });
    };

    function showNotification(message, isError = false) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification';
        notification.classList.add('show');
        if (isError) {
            notification.style.backgroundColor = '#f44336';
        } else {
            notification.style.backgroundColor = '#4CAF50';
        }

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
});
