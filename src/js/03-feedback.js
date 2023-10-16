import { throttle } from 'lodash';
// Import throttle from lodash db

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('[name="email"]');
const messageInput = feedbackForm.querySelector('[name="message"]');
const sendBtn = feedbackForm.querySelector('button[type="submit"]');
// sendBtn.disabled = true;

sendBtn.addEventListener('click', stopBtn);
function stopBtn(evt) {
  if ((sendBtn.disabled = true)) {
    sendBtn.style.backgroundColor = 'Red';
    sendBtn.textContent = 'Refresh Page';
  } else {
    sendBtn.style.backgroundColor = 'none';
  }
  feedbackForm.reset();
}

//Disable empty spaces

feedbackForm.addEventListener('input', function () {
  sendBtn.disabled = emailInput.value === '' || messageInput.value === '';
});

//Save to LocalStorage every 1 sec
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

emailInput.addEventListener('input', saveFormState);
messageInput.addEventListener('input', saveFormState);
//Got from LocalStorage
const savedState = localStorage.getItem('feedback-form-state');

if (savedState) {
  const parsedState = JSON.parse(savedState);
  emailInput.value = parsedState.email;
  messageInput.value = parsedState.message;
}
//Cleaned space and LS
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
  sendBtn.disabled = true;
});
