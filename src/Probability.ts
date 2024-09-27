export default class Probability {
  n: number
  d: number

  constructor (n: number, d: number) {
    while (n % 2 == 0 && d % 2 == 0){
      n /= 2
      d /= 2
    }
    while (n % 3 == 0 && d % 3 == 0){
      n /= 3
      d /= 3
    }
    while (n % 5 == 0 && d % 5 == 0){
      n /= 5
      d /= 5
    }
    this.n = n
    this.d = d
  }

  mult (b: Probability): Probability {
    return new Probability(this.n * b.n, this.d * b.d)
  }

  add (b: Probability): Probability {
    return new Probability(this.n * b.d + b.n * this.d, this.d * b.d)
  }

  subtract (b: Probability): Probability {
    return new Probability(this.n * b.d - b.n * this.d, this.d * b.d)
  }
}