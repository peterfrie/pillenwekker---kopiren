input.onPinPressed(TouchPin.P1, function () {
    wektijd += 3.5
    if (wektijd >= 24) {
        wektijd = wektijd - 24
    }
})
input.onGesture(Gesture.ScreenUp, function () {
    basic.showArrow(ArrowNames.North)
    basic.pause(500)
    basic.clearScreen()
    deksel_open = false
    music.setBuiltInSpeakerEnabled(true)
})
input.onGesture(Gesture.TiltRight, function () {
    music.setBuiltInSpeakerEnabled(true)
    basic.showArrow(ArrowNames.SouthEast)
    basic.showString("alarm")
    basic.showNumber(wektijd)
    basic.pause(500)
    basic.clearScreen()
    deksel_open = false
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    led.enable(true)
    basic.showString("alarm")
    basic.showNumber(wektijd)
    basic.pause(500)
    led.enable(false)
})
input.onGesture(Gesture.ScreenDown, function () {
    music.setBuiltInSpeakerEnabled(true)
    basic.showArrow(ArrowNames.South)
    basic.showString("alarm")
    basic.showNumber(wektijd)
    basic.pause(500)
    basic.clearScreen()
    deksel_open = false
})
input.onGesture(Gesture.TiltLeft, function () {
    music.setBuiltInSpeakerEnabled(true)
    basic.showArrow(ArrowNames.SouthWest)
    basic.showString("alarm")
    basic.showNumber(wektijd)
    basic.pause(500)
    basic.clearScreen()
    deksel_open = false
})
input.onButtonPressed(Button.A, function () {
    minuut_tiental += 3
})
input.onGesture(Gesture.LogoUp, function () {
    music.setBuiltInSpeakerEnabled(true)
    basic.showArrow(ArrowNames.North)
    basic.pause(500)
    basic.clearScreen()
    deksel_open = false
})
input.onGesture(Gesture.LogoDown, function () {
    if (alarm) {
        music.setBuiltInSpeakerEnabled(false)
        basic.showIcon(IconNames.Happy)
        deksel_open = true
        alarm = false
        basic.pause(500)
        basic.clearScreen()
        I2C_LCD1602.ShowString("alarm gewist", 0, 1)
        basic.pause(500)
    } else {
        music.setBuiltInSpeakerEnabled(true)
        basic.showArrow(ArrowNames.South)
        basic.showString("alarm")
        basic.showNumber(wektijd)
        basic.pause(500)
        basic.clearScreen()
        deksel_open = true
    }
})
input.onButtonPressed(Button.B, function () {
    led.enable(true)
    basic.showString("tijd\"" + convertToText(uur_tiental) + convertToText(uur_eenheid) + ":" + convertToText(minuut_tiental) + convertToText(minuut_eenheid))
    basic.pause(500)
    basic.clearScreen()
})
input.onButtonPressed(Button.AB, function () {
    minuut_eenheid = 0
    minuut_tiental = 0
})
let deksel_open = false
let alarm = false
let wektijd = 0
let uur_tiental = 0
let uur_eenheid = 0
let minuut_tiental = 0
let minuut_eenheid = 0
let seconde = 0
minuut_eenheid = 0
minuut_tiental = 0
uur_eenheid = 0
uur_tiental = 0
wektijd = 7
alarm = false
deksel_open = false
let Genegeerd = 0
music.setBuiltInSpeakerEnabled(true)
music.setTempo(120)
pins.digitalWritePin(DigitalPin.P6, 0)
pins.digitalWritePin(DigitalPin.P7, 1)
pins.digitalWritePin(DigitalPin.P8, 1)
pins.digitalWritePin(DigitalPin.P9, 1)
led.enable(false)
led.setBrightness(78)
basic.showIcon(IconNames.Heart)
basic.pause(1000)
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Baddy), music.PlaybackMode.UntilDone)
music.setBuiltInSpeakerEnabled(true)
basic.clearScreen()
I2C_LCD1602.LcdInit(0)
I2C_LCD1602.on()
I2C_LCD1602.clear()
I2C_LCD1602.ShowString("tijd:   " + convertToText(uur_tiental) + convertToText(uur_eenheid) + ":" + convertToText(minuut_tiental) + convertToText(minuut_eenheid), 0, 0)
I2C_LCD1602.ShowString("alarm:  " + convertToText(Math.round(wektijd)) + ":" + convertToText(wektijd % 1), 0, 1)
basic.forever(function () {
    while (!(alarm)) {
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString(convertToText("alarm:  " + convertToText(Math.round(wektijd)) + "." + convertToText(wektijd % 1 * 60)), 0, 0)
        I2C_LCD1602.ShowString("tijd:  " + convertToText(uur_tiental) + convertToText(uur_eenheid) + ":" + convertToText(minuut_tiental) + convertToText(minuut_eenheid), 0, 1)
        basic.pause(500)
        while (alarm == true) {
            led.enable(true)
            basic.showIcon(IconNames.QuarterNote)
            music.setBuiltInSpeakerEnabled(true)
            music.play(music.stringPlayable("E B C5 A B G A F ", 120), music.PlaybackMode.UntilDone)
        }
        music.setBuiltInSpeakerEnabled(false)
        basic.showIcon(IconNames.Yes)
    }
})
loops.everyInterval(1000, function () {
    seconde += 1
    if (seconde >= 60) {
        minuut_eenheid += 1
        seconde = 0
    }
    if (minuut_eenheid >= 10) {
        minuut_tiental += 1
        minuut_eenheid = 0
    }
    if (minuut_tiental >= 6) {
        uur_eenheid += 1
        minuut_tiental = 0
    }
    if (uur_eenheid >= 10) {
        uur_tiental += 1
        uur_eenheid = 0
    }
    if ((uur_tiental * 10 + (uur_eenheid + minuut_tiental)) / 10 >= wektijd) {
        alarm = true
        wektijd += 3.5
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("ALARM geactiveerd", 1, 0)
        basic.pause(100)
        if (wektijd > 24) {
            wektijd += -24
        }
        if (uur_tiental >= 2) {
            if (minuut_eenheid > 3) {
                uur_eenheid = 0
                uur_tiental = 0
            }
        }
    }
})
