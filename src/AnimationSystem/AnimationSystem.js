import * as PIXI from 'pixi.js';

export default class AnimationSystem {
    constructor(canvasContainerID) {
        this.pixiApp = new PIXI.Application({
            width: 600,
            height: 600,
            backgroundColor: 0xe3ffff,
            resolution: window.devicePixelRatio || 1,
            antialias: true
        });

        this.canvasContainer = document.getElementById(canvasContainerID);
        this.canvasContainer.appendChild(this.pixiApp.view);

        this.animT = 0;

        this.canvasGraphics = new PIXI.Graphics();
        this.pixiApp.stage.addChild(this.canvasGraphics);

        this.particleFunction = null;

        this.executeParticleInfo = (i, animT, width, height) => {
            if (this.particleFunction) {
                return this.particleFunction(i, animT, width, height)
            }else{
                return null;
            }
        }
        window.animationSystem = this;
    }

    selectedFunction(particleFunc) {
        this.particleFunction = particleFunc
    }

    particleCountUpdate(particleCount) {
    }

    animTimeUpdated(animT) {
        this.canvasGraphics.clear();
        this.executeAnimation(animT);
    }

    executeAnimation(animT) {
        const cWidth = this.pixiApp.view.width;
        const cHeight = this.pixiApp.view.height;

        const particleCount = window.animationController.particleCount;

        this.canvasGraphics.lineStyle(0);
        for (let i = 0; i < particleCount; i++) {
            const particleInfo = this.executeParticleInfo(i, animT, cWidth, cHeight);

            if (particleInfo) {
                this.canvasGraphics.beginFill(particleInfo.color.base, window.utils.clamp(particleInfo.color.alpha, 0, 1));

                if (particleInfo.type == "circle") {
                    this.canvasGraphics.drawCircle(particleInfo.position.x, particleInfo.position.y, particleInfo.size.x / 2);
                } else if (particleInfo.type == "rect") {
                    //This is done to make the position of the particle represent the center of the particle
                    const posX = particleInfo.position.x - particleInfo.size.x / 2;
                    const posY = particleInfo.position.y - particleInfo.size.y / 2;
                    this.canvasGraphics.drawRect(posX, posY, particleInfo.size.x, particleInfo.size.y);
                }
                this.canvasGraphics.endFill();
            }
        }
    }
}