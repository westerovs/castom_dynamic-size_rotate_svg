/* eslint-disable */

class Capture {
    constructor(element) {
        // ===== element
        this.element = element
        this.elementWidth = this.element.getBoundingClientRect().right - this.element.getBoundingClientRect().left
        this.elementHeight = this.element.getBoundingClientRect().bottom - this.element.getBoundingClientRect().top
        this.elementCurrentWidth = this.elementWidth
        this.elementCurrentHeight = this.elementHeight
        this.elementTop = this.element.getBoundingClientRect().top
        this.elementLeft = this.element.getBoundingClientRect().left
        this.elementTranslateOffsetX = this.element.getBBox().x
        this.elementTranslateOffsetY = this.element.getBBox().y
        this.startRotate = 0 // ! warning !
        
        // ===== capture
        this.capture = document.querySelector('.capture')
        this.captureBtnSize = document.querySelectorAll('.capture__size')
        this.captureBtnRotate = document.querySelectorAll('.capture__rotate')
        
        // ===== reset
        this.reset = document.querySelector('.panel__out--reset')
        this.reset.addEventListener('touchstart', this.resetAll)
        this.resetElementWidth = this.elementWidth
        this.resetElementHeight = this.elementHeight
        this.resetElementRotate = this.startRotate
        this.resetcaptureWidth = this.resetElementWidth
        this.resetcaptureHeight = this.resetElementHeight
        this.resetcaptureRotate = this.resetElementRotate
        
        // ===== размеры рамки при выборе элемента
        this.capture.style.top = `${ this.elementTop }px`
        this.capture.style.left = `${ this.elementLeft }px`
        this.capture.style.width = `${ this.resetElementWidth }px`
        this.capture.style.height = `${ this.resetElementHeight }px`
        
        // ===== row out
        this.outWidth = document.querySelector('.panel__output-width')
        this.outHeight = document.querySelector('.panel__output-height')
        this.outRotate = document.querySelector('.panel__output-rotate')
        this.outWidth.innerHTML = this.elementWidth
        this.outHeight.innerHTML = this.elementHeight
        this.outRotate.innerHTML = this.startRotate
        
        // ===== for atan function
        this.startTouches = 0
        this.Nex = 0
        this.degreeAngle = 0
        this.val = 0
        this.startMouse = 0
        this.Dist = 0
        this.element.style.transform = `rotate(${ this.startRotate }deg)`
        // this.element.style.transform = `
        //     rotate(${this.startRotate}deg)
        //     scaleX(${1})
        //     scaleY(${1})
        //     translateX(${80}px)
        //     translateY(${80}px)
        // `;
        
        // ===== progress
        this.progressDeg = 0
        this.progressDegStart = 0
        this.progressW = 0
        this.progressH = 0
        
        // change size
        this.captureBtnSize.forEach(item => {
            item.addEventListener('touchstart', this.touchStartSize)
            item.addEventListener('touchmove', this.touchMoveSize)
            item.addEventListener('touchend', this.touchEndSize)
        })
        
        // change rotate
        this.captureBtnRotate.forEach(item => {
            item.addEventListener('touchstart', this.touchStartRotate)
            item.addEventListener('touchmove', this.touchMoveRotate)
            item.addEventListener('touchend', this.touchEndRotate)
        })
        
        this.scale = {
            x: 1,
            y: 1,
        }
    } // end constructor
    
    // =======================================================
    //                          SIZE
    // =======================================================
    touchStartSize = (event) => {
        event.stopPropagation()
        event.preventDefault()
        
        this.startTouches = event.targetTouches[0]
        this.startElementWidth = this.elementCurrentWidth
        this.startElementHeight = this.elementCurrentHeight
    }
    
    touchMoveSize = (event) => {
        event.stopPropagation()
        event.preventDefault()
        this.progressW = this.elementCurrentWidth
        this.progressH = this.elementCurrentHeight
        
        const moveTouches = event.targetTouches[0]
        const differenceStartMoveX = moveTouches.pageX - this.startTouches.pageX
        const differenceStartMoveY = moveTouches.pageY - this.startTouches.pageY
        this.elementCurrentWidth = (this.startElementWidth + differenceStartMoveX)
        this.elementCurrentHeight = (this.startElementHeight + differenceStartMoveY)
        
        this.scale = {
            x: this.elementCurrentWidth / this.elementWidth,
            y: this.elementCurrentHeight / this.elementHeight,
        }
        
        // ------ transformOrigin ---------------------------
        this.transOriginX = this.elementTranslateOffsetX + this.elementCurrentWidth / 2
        this.transOriginY = this.elementTranslateOffsetY + this.elementCurrentHeight / 2
        
        this.element.style.transformOrigin = `
            ${ this.transOriginX }px
            ${ this.transOriginY }px`
        
        this.element.style.transform = `
            rotate(${ this.val }deg)
            scaleX(${ this.scale.x })
            scaleY(${ this.scale.y })
            translateX(${ this.transOriginX - ((this.elementWidth + this.elementTranslateOffsetX * 2) / 2) }px)
            translateY(${ this.transOriginY - ((this.elementHeight + this.elementTranslateOffsetY * 2) / 2) }px)
            `
        
        // ограничение зеркальности
        // if (this.progressW <= 0) {
        //     console.warn('!!!');
        //     this.element.style.transform = `
        //     rotate(${this.val}deg)
        //     scaleX(${0})
        //     scaleY(${this.scale.y})`;
        // }
        // if (this.progressH <= 0) {
        //     console.warn('!!!');
        //     this.element.style.transform = `
        //     rotate(${this.val}deg)
        //     scaleX(${this.scale.x})
        //     scaleY(${0})`;
        //     this.outHeight.innerHTML = `asdffrg`;
        // }
        
        this.capture.style.width = `${ this.elementCurrentWidth }px`
        this.capture.style.height = `${ this.elementCurrentHeight }px`
        this.capture.style.transform = `rotate(${ this.val }deg)`
        
        // out
        this.outWidth.innerHTML = this.elementCurrentWidth
        this.outHeight.innerHTML = this.elementCurrentHeight
        event.target.style.backgroundColor = 'red'
    }
    
    touchEndSize = (event) => {
        event.target.style.backgroundColor = 'blue'
    }
    
    // =======================================================
    //                         ROTATE SIZE GROOP
    // =======================================================
    touchStartRotate = (event) => {
        event.stopPropagation()
        event.preventDefault()
        
        this.startTouchVal = this.val
        this.progressDegStart = this.progressDeg
        // парксинг ротейта // this.Nex  -  текущий градус поворода при touchstart
        this.Nex = this.val ? this.val : parseFloat(this.element.style.transform.slice(7))
        
        this.startMouse = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY,
        }
        
        // ------ transformOrigin ---------------------------
        this.transOriginX = this.elementTranslateOffsetX + this.elementCurrentWidth / 2
        this.transOriginY = this.elementTranslateOffsetY + this.elementCurrentHeight / 2
        
        this.element.style.transformOrigin = `
            ${ this.transOriginX }px
            ${ this.transOriginY }px`
        
        this.element.style.transform = `
            rotate(${ this.val }deg)
            scaleX(${ this.scale.x })
            scaleY(${ this.scale.y })
            translateX(${ this.transOriginX - ((this.elementWidth + this.elementTranslateOffsetX * 2) / 2) }px)
            translateY(${ this.transOriginY - ((this.elementHeight + this.elementTranslateOffsetY * 2) / 2) }px)
            `
        
        // out
        this.outRotate.innerHTML = this.startElementRotate
        event.target.style.backgroundColor = 'red'
    }
    
    touchMoveRotate = (event) => {
        event.stopPropagation()
        event.preventDefault()
        
        const mouse = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY,
        }
        
        const center = {
            x: this.elementLeft + this.elementWidth / 2,
            y: this.elementTop + this.elementHeight / 2,
        }
        
        this.Dist = Math.atan2(
            (center.x - mouse.x) * (center.y - this.startMouse.y) -
            (center.y - mouse.y) * (center.x - this.startMouse.x),
            (center.x - mouse.x) * (center.x - this.startMouse.x) +
            (center.y - mouse.y) * (center.y - this.startMouse.y),
        )
        
        this.Dist *= -1
        this.degreeAngle = this.Dist * (180 / Math.PI)
        this.val = this.degreeAngle + this.Nex
        this.element.style.transform = `
            rotate(${ this.val }deg)
            scaleX(${ this.scale.x })
            scaleY(${ this.scale.y })
            translateX(${ this.transOriginX - ((this.elementWidth + this.elementTranslateOffsetX * 2) / 2) }px)
            translateY(${ this.transOriginY - ((this.elementHeight + this.elementTranslateOffsetY * 2) / 2) }px)
            `
        // translateX(${-this.transOriginX}px)
        
        this.capture.style.transform = `rotate(${ this.val }deg)`
        
        // progress
        this.progressDeg = this.val
        this.outRotate.innerHTML = this.val
    }
    
    touchEndRotate = (event) => {
        event.target.style.backgroundColor = 'transparent'
    }
    
    // **********************************************************************************
    resetAll = () => {
        console.log(`reset`)
        // this.element.style.transform = `
        //     rotate(${0}deg)
        //     scaleX(${1})
        //     scaleY(${1})`;
        // this.elementCurrentWidth = this.elementWidth;
        // this.elementCurrentHeight = this.elementHeight;
        
        // this.capture.style.transform = `rotate(${0}deg)`;
        // this.capture.style.width = `${this.resetElementWidth}px`;
        // this.capture.style.height = `${this.resetElementHeight}px`;
    }
    
    remove = () => {
        // this.resetAll();
        this.captureBtnSize.forEach(item => {
            item.removeEventListener('touchstart', this.touchStart)
            item.removeEventListener('touchmove', this.touchMove)
            item.removeEventListener('touchend', this.touchEnd)
        })
        
        this.captureBtnRotate.forEach(item => {
            item.removeEventListener('touchstart', this.touchStartRotate)
            item.removeEventListener('touchmove', this.touchMoveRotate)
            item.removeEventListener('touchend', this.touchEndRotate)
        })
        
        this.reset.removeEventListener('touchstart', this.resetAll)
        
        // не полный reset
        // this.capture.style.transform = `rotate(${this.startElementRotate}deg)`;
        this.outWidth.innerHTML = this.elementWidth
        this.outHeight.innerHTML = this.elementHeight
        this.outRotate.innerHTML = this.startElementRotate
    }
    
    init = () => {
    
    }
} // end capture

// =================================================
const group = document.querySelector('.group')
console.log(group.getBBox())

// eslint-disable-next-line no-unused-vars
const capture = new Capture(group)

