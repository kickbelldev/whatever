class MyPromise<T> {
  private fulfilledCallback?: (value?: any) => void
  private rejectedCallback?: (reason?: any) => void

  constructor(
    executor: (
      resolve: (value?: T | MyPromise<T>) => void,
      reject: (reason?: any) => void
    ) => any
  ) {
    executor(this.resolve.bind(this), this.reject.bind(this))
  }

  private resolve(value?: T | MyPromise<T>) {
    queueMicrotask(() => {
      if (value instanceof MyPromise) {
        value.then(this.resolve.bind(this), this.reject.bind(this))
        return
      }

      this.fulfilledCallback?.(value)
    })
  }

  private reject(reason?: any | MyPromise<any>) {
    queueMicrotask(() => {
      if (reason instanceof MyPromise) {
        reason.then(this.resolve.bind(this), this.reject.bind(this))
        return
      }

      this.rejectedCallback?.(reason)
    })
  }

  then<TFulfilledResult, TRejectedResult = never>(
    onfulfilled?: (value: T) => TFulfilledResult | MyPromise<TFulfilledResult>,
    onrejected?: (reason: any) => TRejectedResult | MyPromise<TRejectedResult>
  ) {
    return new MyPromise<TFulfilledResult | TRejectedResult>(
      (resolve, reject) => {
        this.fulfilledCallback = (value: T) => {
          if (!onfulfilled) {
            resolve()
            return
          }
          try {
            resolve(onfulfilled(value))
          } catch (e) {
            reject(e)
          }
        }

        this.rejectedCallback = (reason: any) => {
          if (!onrejected) {
            reject()
            return
          }

          try {
            resolve(onrejected(reason))
          } catch (e) {
            reject(e)
          }
        }
      }
    )
  }

  catch<TRejectedResult = never>(
    onrejected?: (reason: any) => TRejectedResult | MyPromise<TRejectedResult>
  ) {
    return new MyPromise<T | TRejectedResult>((resolve, reject) => {
      this.fulfilledCallback = (value: T) => {
        try {
          resolve(value)
        } catch (e) {
          reject(e)
        }
      }

      this.rejectedCallback = (reason: any) => {
        if (!onrejected) {
          reject()
          return
        }

        try {
          resolve(onrejected(reason))
        } catch (e) {
          reject(e)
        }
      }
    })
  }

  finally(onfinally?: () => void) {
    return this.then(onfinally, onfinally)
  }
}
export default MyPromise
