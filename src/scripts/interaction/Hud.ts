export default class HUD extends Phaser.GameObjects.Container {
    promptText: Phaser.GameObjects.Text;

    static inScene(scene: Phaser.Scene) {
        return new HUD(scene);
    }
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.promptText = scene.add.text((this.scene.scale.width/2) - 100,
                                         this.scene.scale.height - 100,
                                        '', { color: '#0', fontSize: 30 })
                               .setVisible(false);

        let mainScene = this.scene.scene.get('main-scene');
        mainScene.events.on('show-prompt', text => this.showPrompt(text));
        mainScene.events.on('hide-prompt', () => this.hidePrompt());
    }
    showPrompt(text: string) {
        this.promptText.setText(text);
        this.promptText.setVisible(true);
    }
    hidePrompt() {
        this.promptText.setVisible(false);
    }
}
