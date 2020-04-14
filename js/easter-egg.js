let PATH = {
    giftIcon: {
        icon: ".gift-icon",
        gift: ".gift",
        egg: ".egg"
    },

    chickIcon: ".chick-icon",
    basketIcon: {
        icon: ".basket-icon",
        egg1: ".basket-icon__egg-1",
        egg2: ".basket-icon__egg-2"
    },

    paintingIcon: {
        icon: ".painting-icon",
        allComponents: ".painting-icon svg > g",
        brush: ".painting-icon__brush",
        eggTop: ".painting-icon__egg-top",
        eggTopParts: ".painting-icon__egg-top path",
        eggTopColored: ".painting-icon__egg-top .egg-top__main"
    },

    hatchIcon: {
        icon: ".hatch-icon",
        rabbit: ".hatch-icon__rabbit",
        rabbitPaws: ".hatch-icon__rabbit-paws",
        rabbitHead: ".hatch-icon__rabbit-head",
        egg: ".hatch-icon__egg"
    }
};

const _revealVert = (bottomY, easing, delay) => ({
    translateY: [bottomY, 0],
    opacity: [0, 1],
    easing: easing,
    delay: anime.stagger(delay)
});


const _shiver = () => ({
    keyframes: [{
            rotate: -10
        },
        {
            rotate: 10
        },
        {
            rotate: 0
        },
        {
            rotate: 0
        },
        {
            rotate: 0
        },
        {
            rotate: 0
        },
        {
            rotate: 0
        },
        {
            rotate: 0
        },
        {
            rotate: 0
        },
        {
            rotate: 0
        }
    ],

    loop: true,
    easing: "linear",
    duration: 1200
});


const _hideElem = elemPath => {
    const elem = document.querySelector(elemPath);
    elem.style.opacity = 0;
};

const _showElem = elemPath => {
    const elem = document.querySelector(elemPath);
    elem.style.opacity = 1;
};

let giftEggAnimation;

const giftIconAnimation = anime({
    targets: [`${PATH.giftIcon.gift}`, `${PATH.giftIcon.egg}`],
    ..._revealVert(150, "easeOutElastic", 100),

    complete: function() {
        const egg = document.querySelector(PATH.giftIcon.egg);
        egg.style.transformOrigin = "75% bottom";

        giftEggAnimation = anime({
            targets: `${PATH.giftIcon.egg}`,
            ..._shiver()
        });

    }
});

let chickJumpAnimation;

const jumpKeyframes = {
    scaleY: [{
            value: 0.9,
            duration: 170
        },
        {
            value: 1,
            duration: 170,
            delay: 120
        }
    ],

    translateY: [{
            value: -20,
            duration: 170,
            delay: 170
        },
        {
            value: 0,
            duration: 170,
            delay: 220
        }
    ]
};



const chickIconAnimation = anime({
    targets: `${PATH.chickIcon}`,
    ..._revealVert(25, "easeOutElastic", 100),

    complete: function() {
        const chick = document.querySelector(PATH.chickIcon);
        chick.style.transformOrigin = "center bottom";

        chickJumpAnimation = anime({
            targets: `${PATH.chickIcon}`,
            ...jumpKeyframes,
            loop: true,
            easing: "linear"
        });

    }
});

let eggsRevealAnimation;

const basketIconAnimation = anime({
    targets: `${PATH.basketIcon.icon}`,
    ..._revealVert(25, "easeOutElastic", 100),

    complete: function() {
        eggsRevealAnimation = anime({
            targets: [`${PATH.basketIcon.egg1}`, `${PATH.basketIcon.egg2}`],
            ..._revealVert(50, "easeOutElastic", 150),
            loop: true
        });

    }
});

let paintingAnimation;
let paintedPartAnimation;

_hideElem(PATH.paintingIcon.eggTop);

const brushKeyframes = {
    translateX: [{
            value: -150,
            duration: 150
        },
        {
            value: -180,
            duration: 150,
            delay: 100
        },
        {
            value: 0,
            duration: 150,
            delay: 100
        },
        {
            value: 0,
            duration: 150,
            delay: 1850
        }
    ],

    translateY: [{
            value: -160,
            duration: 150
        },
        {
            value: 0,
            duration: 150,
            delay: 100
        },
        {
            value: 0,
            duration: 150,
            delay: 1800
        }
    ]
};



const paintKeyframes = {
    opacity: [{
            value: 1,
            duration: 200,
            delay: 200
        },
        {
            value: 0,
            duration: 200,
            delay: 900
        },
        {
            value: 0,
            duration: 150,
            delay: 1000
        }
    ]
};



const paintingIconAnimation = anime({
    targets: `${PATH.paintingIcon.allComponents}`,
    ..._revealVert(150, "easeOutElastic", 100),

    complete: function() {
        paintingAnimation = anime({
            targets: `${PATH.paintingIcon.brush}`,
            ...brushKeyframes,
            easing: "linear",
            loop: true
        });


        paintedPartAnimation = anime({
            targets: `${PATH.paintingIcon.eggTop}`,
            ...paintKeyframes,
            easing: "linear",
            loop: true
        });

    }
});

let jumpRabbitAnimation;

_hideElem(PATH.hatchIcon.rabbit);

const jumpRabbitKeyframes = {
    translateY: [{
            value: 50,
            duration: 50,
            delay: 100
        },
        {
            value: -90,
            duration: 150,
            delay: 100
        },
        {
            value: 0,
            duration: 100,
            delay: 100
        },
        {
            value: 0,
            duration: 100,
            delay: 1200
        }
    ]
};



const hatchIconAnimation = anime({
    targets: `${PATH.hatchIcon.icon}`,
    ..._revealVert(25, "easeOutElastic", 100),

    complete: function() {
        _showElem(PATH.hatchIcon.rabbit);

        jumpRabbitAnimation = anime({
            targets: `${PATH.hatchIcon.rabbit}`,
            ...jumpRabbitKeyframes,
            easing: "linear",
            loop: true
        });

    }
});

const replay = ({
    initTarget,
    initValues
}, cbPauseArr, cbRestart) => {
    anime.set(initTarget, {
        ...initValues
    });

    cbPauseArr.forEach(elem => {
        elem.pause();
    });
    cbRestart.restart();
};

const giftReplay = document.querySelector(PATH.giftIcon.icon).
nextElementSibling;

giftReplay.addEventListener("click", function() {
    replay({
            initTargets: [`${PATH.giftIcon.gift}`, `${PATH.giftIcon.egg}`],
            initValues: {
                opacity: 0
            }
        },

        [giftEggAnimation],
        giftIconAnimation);

});

const chickReplay = document.querySelector(PATH.chickIcon).nextElementSibling;

chickReplay.addEventListener("click", function() {
    replay({
            initTargets: `${PATH.chickIcon}`,
            initValues: {
                opacity: 0
            }
        },

        [chickJumpAnimation],
        chickIconAnimation);

});

const basketReplay = document.querySelector(PATH.basketIcon.icon).
nextElementSibling;

basketReplay.addEventListener("click", function() {
    replay({
            initTargets: `${PATH.basketIcon.icon}`,
            initValues: {
                opacity: 0
            }
        },

        [eggsRevealAnimation],
        basketIconAnimation);

});

const paintingReplay = document.querySelector(PATH.paintingIcon.icon).
nextElementSibling;

paintingReplay.addEventListener("click", function() {
    _hideElem(PATH.paintingIcon.eggTop);
    replay({
            initTargets: `${PATH.paintingIcon.eggTop}`,
            initValues: {
                opacity: 0
            }
        },

        [paintingAnimation, paintedPartAnimation],
        paintingIconAnimation);

});

const hatchReplay = document.querySelector(PATH.hatchIcon.icon).
nextElementSibling;

hatchReplay.addEventListener("click", function() {
    _hideElem(PATH.hatchIcon.rabbit);
    replay({
            initTargets: `${PATH.hatchIcon.icon}`,
            initValues: {
                opacity: 0
            }
        },

        [jumpRabbitAnimation],
        hatchIconAnimation);

});