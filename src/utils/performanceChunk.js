function performanceChunk(data, taskHandler, scheduler) {
  if (typeof data === "number") {
    data = { length: data };
  }
  if (data.length === 0) {
    return;
  }
  let currentIndex = 0;

  function next() {
    if (currentIndex >= data.length) {
      return;
    }
    scheduler((shouldContinue) => {
      while (shouldContinue() && currentIndex < data.length) {
        taskHandler(data, currentIndex);
        currentIndex += 1;
      }
      next();
    });
  }

  next();
}

function browserPerformanceChunk(data, taskHandler) {
  function scheduler(executeTask) {
    requestIdleCallback((IdleDeadline) => {
      executeTask(() => IdleDeadline.timeRemaining() > 0); //() => IdleDeadline.timeRemaining() > 0 会被当作shouldContinue用来判断是否继续执行
    });
  }

  performanceChunk(data, taskHandler, scheduler);
}
