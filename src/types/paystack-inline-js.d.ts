declare module '@paystack/inline-js' {
  type PaystackTransactionCallback = (transaction: { reference?: string; id?: number; message?: string }) => void

  type PaystackErrorCallback = (error: { message?: string }) => void

  type ResumeTransactionOptions = {
    onSuccess?: PaystackTransactionCallback
    onCancel?: () => void
    onError?: PaystackErrorCallback
  }

  export default class PaystackPop {
    resumeTransaction(accessCode: string, callbacks?: ResumeTransactionOptions): void
    newTransaction(options: Record<string, unknown>): unknown
  }
}
