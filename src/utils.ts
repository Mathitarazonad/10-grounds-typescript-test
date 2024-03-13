import { CLASS_TUBE_UNITS, MAX_HOURS_OF_WORK, MIN_HOURS_OF_WORK, TUBES_QUANTITY_PER_UNIT } from './constants.js'
import { SingleTube } from './interfaces.js'

export function rand (): number {
  let hoursOfUse = 0
  const getRandomHours = () => Math.floor(Math.random() * MAX_HOURS_OF_WORK)

  // Get a random number between 100 and 200
  while (hoursOfUse < MIN_HOURS_OF_WORK) {
      hoursOfUse = getRandomHours()
  }

  return hoursOfUse
}


export const tubeShouldBreak = (singleTube: SingleTube): boolean => singleTube.hoursOfUse === 0

export const createSingleTube = (): SingleTube => ({ hoursOfUse: rand(), broken: false })
export const createSingleTubeUnit = (): SingleTube[] => new Array(TUBES_QUANTITY_PER_UNIT).fill(0).map(_ => createSingleTube())
export const createClassroomTubeUnits = (): Array<SingleTube[]> => new Array(CLASS_TUBE_UNITS).fill(0).map(_ => createSingleTubeUnit())