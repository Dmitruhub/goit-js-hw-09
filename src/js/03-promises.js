import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.1;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  let {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  let elemDelay = Number(delay.value);
  let elemStep = Number(step.value);
  let elemAmount = Number(amount.value);
  if (elemDelay < 0 || elemStep < 0 || elemAmount <= 0) {
    alert('Date must be positive');
    return;
  }

  for (let position = 1; position <= elemAmount; position += 1) {
    createPromise(position, elemDelay)
      .then(({ position, delay }) => {
        setTimeout(
          () =>
            Notiflix.Notify.success(
              `✅ Fulfilled promise ${position} in ${delay}ms`
            ),
          delay
        );
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        setTimeout(
          () =>
            Notiflix.Notify.failure(
              `❌ Rejected promise ${position} in ${delay}ms`
            ),
          delay
        );
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    elemDelay += elemStep;
    console.log(createPromise);
  }
}
