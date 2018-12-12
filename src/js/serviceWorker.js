

window.navigator.serviceWorker.register('./demo.js').then(
  function() {
    console.log('注册成功');
  }
).catch(err => {
  console.error('注册失败');
})