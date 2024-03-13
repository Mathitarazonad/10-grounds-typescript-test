import { 
  DAILY_HOURS_CLASSROOM_USE,
  DAYS_PER_WEEK_CLASSROOM_USE,
  MIN_BROKEN_TUBES_TO_REPLACE,
  MONTHS_PER_YEAR_CLASSROOM_USE,
  SINGLE_TUBE_COST,
  TUBES_QUANTITY_PER_UNIT
} from './constants.js';
import { createClassroomTubeUnits, rand, tubeShouldBreak } from './utils.js';

const weeksPerMonth = Math.floor(30 / 7)
const daysUsedInYear = (weeksPerMonth * MONTHS_PER_YEAR_CLASSROOM_USE) * DAYS_PER_WEEK_CLASSROOM_USE
const yearlyHoursOfUse = daysUsedInYear * DAILY_HOURS_CLASSROOM_USE

let currentHour = 0
let brokenTubesInYear = 0
let moneySpentInYear = 0
const currentClassroomTubes = createClassroomTubeUnits()


while (currentHour <= yearlyHoursOfUse) {
  currentClassroomTubes.forEach(tubeUnit => {
      // Set a tube as broken or just subtract 1 hour of use
      tubeUnit.forEach(singleTube => {
          if (tubeShouldBreak(singleTube)) singleTube.broken = true
          else singleTube.hoursOfUse -= 1
      })
      
      const brokenTubesInUnit = tubeUnit.filter(singleTube => singleTube.broken).length
      if (brokenTubesInUnit >= MIN_BROKEN_TUBES_TO_REPLACE) {
          // Add the cost of each single fluorescent for the tube unit and replace them from new ones
          moneySpentInYear += SINGLE_TUBE_COST * TUBES_QUANTITY_PER_UNIT
          brokenTubesInYear += brokenTubesInUnit

          tubeUnit.forEach(singleTube => {
              singleTube.broken = false;
              singleTube.hoursOfUse = rand()
          })
      }

      return tubeUnit
  })

  currentHour++
}

console.log(`${moneySpentInYear}$ were spent in fluorescent tubes during the year`)
console.log(`${brokenTubesInYear} fluorescent tubes were broken during the year`)
