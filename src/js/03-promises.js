import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', formPromisSubmit);

 
function formPromisSubmit(event) {
  event.preventDefault();

  const formValue = event.currentTarget.elements;
  const formData = {
    delay: Number(formValue.delay.value),
    step: Number(formValue.step.value),
    amount: Number(formValue.amount.value),
  };
  console.log(formData);
  
  for (let i = 1; i <= formData.amount; i += 1) {
    createPromise(i, formData.delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    formData.delay += formData.step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
      console.log(Promise);
    }, delay);
  });
}

Notiflix.Notify.init({
  position: 'center-top',
  width: '380px',
  distance: '100px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
});

