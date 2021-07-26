function initCarousel() {
  const carousel = document.querySelector('.carousel__inner')
  const carouselWidth = carousel.offsetWidth
  const nextBttn = document.querySelector('.carousel__arrow_right')
  const prevBttn = document.querySelector('.carousel__arrow_left')
  let countClick = 0

  prevBttn.style.display = 'none'
  nextBttn.addEventListener('click', () => {
    countClick = ++countClick
    carousel.style.transform = `translateX(-${carouselWidth*countClick}px)`
    if(countClick === 3) {
      nextBttn.style.display = 'none'
    } else {
      nextBttn.style.display = ''
      prevBttn.style.display = ''
    }
  })

  prevBttn.addEventListener('click', () => {
    countClick = --countClick
    carousel.style.transform = `translateX(-${carouselWidth*(countClick)}px)`
    if(countClick === 0) {
      prevBttn.style.display = 'none'
    } else {
      prevBttn.style.display = ''
      nextBttn.style.display = ''
    }
  })
}
