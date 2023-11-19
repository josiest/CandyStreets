import * as Phaser from 'phaser'
import IActivatableWidget from '../ui/ActivatableWidget'

export default class HUD extends Phaser.GameObjects.Container
                         implements IActivatableWidget {

    isActive: boolean;
    promptText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.type = 'HUD';
        this.promptText = scene.add.text((this.scene.scale.width/2) - 100,
                                         this.scene.scale.height - 100,
                                        '', { color: '#0', fontSize: 30 })
                               .setVisible(false);

        if (this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keyup-E', event => {
                if (this.isActive) {
                    this.scene.events.emit('hud-interacted');
                }
            });
        }

        let mainScene = this.scene.scene.get('main-scene');
        mainScene.events.on('show-prompt', text => this.showPrompt(text));
        mainScene.events.on('hide-prompt', () => this.hidePrompt());
    }
    activate() {
        this.isActive = true;
        this.setVisible(true);
    }
    deactivate() {
        this.isActive = false;
        this.setVisible(false);
    }
    showPrompt(text: string) {
        this.promptText.setText(text);
        this.promptText.setVisible(true);
    }
    hidePrompt() {
        this.promptText.setVisible(false);
    }
    setVisible(isVisible: boolean) {
        this.promptText.setVisible(isVisible);
        return super.setVisible(isVisible);
    }
}
