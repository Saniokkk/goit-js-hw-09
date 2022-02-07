import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refFormData = document.querySelector('.form')

refFormData.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  
  let valueDelay = Number(event.currentTarget.elements.delay.value);
  const valueStep = Number(event.currentTarget.elements.step.value);
  const valueAmount = Number(event.currentTarget.elements.amount.value);


  for (let position = 1; position <= valueAmount; position += 1) {
    createPromise(position, valueDelay)
      .then(success)
      .catch(fail);
    valueDelay += valueStep;
  }
  refFormData.reset();
} 

function success ({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function fail({ position, delay }){
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
    
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
}


