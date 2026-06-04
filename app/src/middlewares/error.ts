import { log } from "./logger"

type ThrowErrorInput = {
  error: unknown
  logError?: string
  exceptionErrorMessage?: string
  extra?: Record<string, unknown>
}

export function throwError({
  error,
  logError = "An error occurred: ",
  exceptionErrorMessage = "Internal Server Error",
}: ThrowErrorInput): never {
  log.withMetadata({ error }).error(logError)
  throw new Error(exceptionErrorMessage)
}
