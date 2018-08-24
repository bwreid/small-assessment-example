const main = require('../src/main')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-as-promised'))

describe('answerQuestions', function () {
  it('should answer the questions from a comma separated list of questions', function () {
    const questions = 'Will it rain?,Should I bring an umbrella?,Will I find $10 today?'
    const result = main.answerQuestions(questions)

    return result.then(answers => {
      expect(answers).to.be.an('array')
      expect(answers).to.have.lengthOf(3)

      const allStrings = answers.every(answer => typeof answer === 'string')
      expect(allStrings).to.be.true
    })
  })

  it('should answer a single question', function () {
    const questions = 'Will it rain?'
    const result = main.answerQuestions(questions)

    return result.then(answers => {
      expect(answers).to.be.an('array')
      expect(answers).to.have.lengthOf(1)

      const isString = typeof answers[0] === 'string'
      expect(isString).to.be.true
    })
  })

  it('should return a single error as an object questions', function () {
    const questions = 'Will it rain?,,Will I find $10 today?'
    const result = main.answerQuestions(questions)

    expect(result).to.eventually.be.rejected
    expect(result).to.eventually.have.property('error')
  })
})
