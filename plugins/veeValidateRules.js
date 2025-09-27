import { defineRule } from 'vee-validate'
// import { required, email, min } from '@vee-validate/rules';
import * as rules from '@vee-validate/rules'
import dayjs from 'dayjs'

export default defineNuxtPlugin((nuxtApp) => {
  const isHaveVirtualOffice = (value, data) => {
    if (data[0] === 'false' || data[0] === 'undefined') {
      return false
    }
    return true
  }

  const requiredBoolean = (value, data) => {
    if (value === false || value === true) {
      return true
    }
    return false
  }

  const requiredValue = (value, data) => {
    if (data[0] === 'false' || data[0] === 'undefined') {
      return 'En az bir seçenek seçilmelidir'
    }
    return true
  }

  const isMobileValid = (value, data) => {
    if (data[0] === 'false' || data[0] === 'undefined') {
      return false
    }
    return true
  }

  const validateExpiryDate = (value, data) => {
    const splittedDate = value.split('/')
    if (splittedDate && value.length >= 5 && splittedDate[0] < 13) {
      const now = new Date()
      const expiryDate = new Date('20' + splittedDate[1], splittedDate[0], 0, 23, 59, 59)
      return (expiryDate >= now)
    }
    return false
  }

  const validateDate = (value, data) => {
    const date = dayjs(value, ['D/M/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD'])
    const today = dayjs()

    return today.diff(date, 'year') >= data[0]
  }

  const checkSsn = (value, data) => {
    const regex = /^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/
    return regex.test(value)
  }
  const checkItın = (value, data) => {
    const regex = /^9\d{2}-(7[0-9]|8[0-8]|9[0-2]|9[4-9])-\d{4}$/
    return regex.test(value)
  }
  const checkEin = (value, data) => {
    const regex = /^\d{2}-\d{7}$/
    return regex.test(value)
  }

  const checkEnglish = (value, data) => {
    const regex = /^[a-zA-Z0-9\s]+$/
    return regex.test(value)
  }

  const checkEnglishLetters = (value) => {
    const regex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/
    return regex.test(value) && !/[çğıöşü]/i.test(value)
  }

  const checkPercentage = (value, data) => {
    return parseInt(data[0]) >= 1
  }

  const checkTurkeyId = (value, data) => {
    const regex = /^[1-9]\d{9}[02468]$/
    return regex.test(value)
  }

  const checkForeignCitizen = (value, data) => {
    const regex = /^9/
    return regex.test(value)
  }

  const checkCardRule = (value) => {
    const cleanedValue = value.replace(/\s/g, '')

    if (/^3[47]/.test(cleanedValue)) {
      return /^[0-9]{15,16}$/.test(cleanedValue)
    }
    return /^[0-9]{16}$/.test(cleanedValue)
  }

  const noSpecialChars = (value) => {
    const regex = /^[^!@#$%^&*=<>]*$/
    return regex.test(value)
  }

  const minValueNew = (value, [min, modelValue]) => {
    if (!modelValue) { return true }

    if (isNaN(modelValue) || modelValue < parseFloat(min)) {
      return false
    }

    return true
  }

  const maxValueNew = (value, [max, modelValue]) => {
    if (!modelValue) { return true }

    if (isNaN(modelValue) || modelValue >= parseFloat(max)) {
      return false
    }

    return true
  }

  const totalMinValue = (value, [min, modelValue]) => {
    if (!modelValue) { return true }

    if (isNaN(modelValue) || modelValue <= parseFloat(min)) {
      return false
    }

    return true
  }

  const totalMaxValueUnitPrice = (value, [max, modelValue]) => {
    if (!modelValue) { return true }

    if (isNaN(modelValue) || modelValue >= parseFloat(max)) {
      return false
    }

    return true
  }

  const totalMaxValue = (value, [max, modelValue]) => {
    if (!modelValue) { return true }

    if (isNaN(modelValue) || modelValue >= parseFloat(max)) {
      return false
    }

    return true
  }

  const hasArrayValue = (value, [targetValue]) => {
    if (!Array.isArray(value)) {
      return false
    }
    // String'i number'a çeviriyoruz
    const numericTarget = parseInt(targetValue, 10)
    return value.includes(numericTarget) || false
  }

  const validateWebsite = (value) => {
    if (!value) { return true }

    // Basic URL format with optional protocol
    const urlPattern = /^(https?:\/\/)?(www\.)?[\da-z.-]+\.([a-z.]{2,})([/\w .-]*)*\/?$/i

    // Remove any whitespace
    const cleanUrl = value.trim()

    // Test the URL pattern
    if (!urlPattern.test(cleanUrl)) {
      return false
    }

    return true
  }

  const checkMinimumTwoWords = (value) => {
    if (!value) { return true }

    const words = value.trim().split(/\s+/)

    return words.length >= 2
  }
  const onlyLetters = (value) => {
    if (!value) { return true }

    return /^[\p{L}\s]+$/u.test(value)
  }

  defineRule('requiredBoolean', requiredBoolean)
  defineRule('requiredValue', requiredValue)

  defineRule('checkCard', checkCardRule)
  defineRule('isMobileValid', isMobileValid)
  defineRule('isHaveVirtualOffice', isHaveVirtualOffice)
  defineRule('checkExpiryDate', validateExpiryDate)
  defineRule('checkTurkeyId', checkTurkeyId)
  defineRule('checkForeignCitizen', checkForeignCitizen)
  defineRule('ageLimit', validateDate)
  defineRule('ssn', checkSsn)
  defineRule('itin', checkItın)
  defineRule('ein', checkEin)
  defineRule('isEnglish', checkEnglish)
  defineRule('onlyEnglishLetters', checkEnglishLetters)
  defineRule('percentage', checkPercentage)
  defineRule('noSpecialChars', noSpecialChars)
  defineRule('min_value_new', minValueNew)
  defineRule('max_value_new', maxValueNew)
  defineRule('total_min_value', totalMinValue)
  defineRule('total_max_value_unit_price', totalMaxValueUnitPrice)
  defineRule('total_max_value_kdv', totalMaxValueUnitPrice)
  defineRule('total_max_value', totalMaxValue)
  defineRule('hasArrayValue', hasArrayValue)
  defineRule('website', validateWebsite)
  defineRule('min_two_words', checkMinimumTwoWords)
  defineRule('onlyLetters', onlyLetters)
  Object.keys(rules).forEach((ruleName) => {
    if (typeof rules[ruleName] === 'function') {
      defineRule(ruleName, rules[ruleName])
    }
  })
})
