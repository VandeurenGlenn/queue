const _runQueue = (items, data, job) => Promise.all(items.map(item => job(item, data)))

const runQueue = async (data, queue, job, concurrency = 10) => {
  await _runQueue(queue.splice(0, queue.length > concurrency ? concurrency : queue.length), data, job)
  if (queue.length > 0) return runQueue(data, queue, job)  
}

const queue = async (data, queue, job, concurrency) => {
  console.time(job.name);
  await runQueue(data, queue, job, concurrency)
  console.timeEnd(job.name);
  return
}

module.exports = queue