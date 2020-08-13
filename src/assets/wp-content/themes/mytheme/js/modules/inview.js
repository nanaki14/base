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
      const targetHeight = this.target[i].offsetHeight
      const targetClass = this.target[i].classList

      const offsetY = this.target[i].getBoundingClientRect().top

      const screenHeight = window.innerHeight
      const targetPosition = offsetY - screenHeight

      if (
        -screenHeight <= targetPosition + targetHeight &&
        targetPosition < -screenHeight / 6
      ) {
        if (!targetClass.contains(this.activeClass)) {
          targetClass.add(this.activeClass)
        }
      }
    }
  }
}

export default Inview
