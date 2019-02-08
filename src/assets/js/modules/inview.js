class Inview {
  /**
   * constructor
   * @param {string} - 付与する対象
   * @param {string} - 付与するクラス
   */
  constructor(targetClass, activeClass) {
    this.targetClass = targetClass
    this.activeClass = activeClass
    this.target = null
  }

  setup() {
    this.target = document.getElementsByClassName(this.targetClass)
  }

  start() {
    for (let i = 0; i < this.target.length; i++) {
      let targetHeight = this.target[i].offsetHeight
      let targetClass = this.target[i].classList

      let offsetY = this.target[i].getBoundingClientRect().top

      let screenHeight = window.innerHeight
      let targetPosition = offsetY - screenHeight

      if (-screenHeight <= targetPosition + targetHeight && targetPosition < -screenHeight / 6) {
        if (!targetClass.contains(this.activeClass)) {
          targetClass.add(this.activeClass)
        }
      }
    }
  }
}

export default Inview
