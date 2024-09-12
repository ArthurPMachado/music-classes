import { UseCaseError } from '@/core/errors/interfaces/use-case-error'

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student ${identifier} already exists`)
  }
}

export class SamePasswordError extends Error implements UseCaseError {
  constructor() {
    super('A nova senha não pode ser igual a anterior')
  }
}
