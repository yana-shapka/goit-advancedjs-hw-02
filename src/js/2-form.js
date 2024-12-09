const saveKey = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

const loadKey = key => {
  try {
    const dataFromLS = localStorage.getItem(key);
    return dataFromLS ? JSON.parse(dataFromLS) : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const savedData = loadKey(localStorageKey);
if (savedData) {
  formData.email = savedData.email || '';
  formData.message = savedData.message || '';
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

form.addEventListener('input', evt => {
  formData[evt.target.name] = evt.target.value;
  saveKey(localStorageKey, formData);
});

form.addEventListener('submit', evt => {
  evt.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted formData:', formData);

  localStorage.removeItem(localStorageKey);
  form.reset();
  formData.email = '';
  formData.message = '';
});
