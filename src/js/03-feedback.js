import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';
const email = document.querySelector("input[name = 'email']");
const massage = document.querySelector("textarea[name='message']");

try {
  const stringMessage = throttle(() => {
    const messageObject = {
      email: email.value.trim(),
      message: message.value.trim(),
    };
    localStorage.setItem(storageKey, JSON.stringify(messageObject));
  }, 500);
  form.addEventListener('input', stringMessage);
} catch (error) {
  console.log('error with toStringMessage' + error);
}

function storedMessage() {
  const data = localStorage.getItem(storageKey);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      email.value = parsed.email;
      message.value = parsed.message;
    } catch (error) {
      console.log('error with parse');
    }
  }
}

storedMessage();

form.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log({
    email: email.value,
    message: message.value,
  });
  localStorage.removeItem(storageKeytorageKey);
  form.reset();
});
