import HUD from '../interaction/Hud'

export default class UIScene extends Phaser.Scene {
    stack: Array<Phaser.GameObjects.Container>;

    constructor() {
        super({ key: 'ui-scene', active: true });
        this.stack = new Array<Phaser.GameObjects.Container>();
    }
    create() {
        UIScene.pushContent(this, HUD);
    }

    static pushContent<WidgetType extends Phaser.GameObjects.Container>(
            scene: Phaser.Scene, widgetConstructor) {

        let ui = <UIScene> scene.scene.get('ui-scene');
        if (!ui) {
            return undefined;
        }
        if (ui.stack.length > 0) {
            let current = ui.stack.at(ui.stack.length-1)!;
            current.setVisible(false);
        }
        let widget = new widgetConstructor(ui);
        ui.stack.push(widget);
        widget.setVisible(true);
        return widget;
    }
    static popContent(scene: Phaser.Scene) {
        let ui = <UIScene> scene.scene.get('ui-scene');
        if (!ui) {
            return undefined;
        }
        if (ui.stack.length == 0) {
            return undefined;
        }
        let last = ui.stack.pop();
        if (ui.stack.length > 0) {
            let current = ui.stack.at(ui.stack.length-1)!;
            current.setVisible(true);
        }
        return last;
    }
}
