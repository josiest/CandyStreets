import IActivatableWidget from '../ui/ActivatableWidget'
import HUD from '../interaction/Hud'

export default class UIScene extends Phaser.Scene {
    stack: Array<IActivatableWidget>;

    constructor() {
        super({ key: 'ui-scene', active: true });
        this.stack = new Array<IActivatableWidget>();
    }
    create() {
        UIScene.pushContent(this, HUD);
    }

    static pushContent<WidgetType extends Phaser.GameObjects.Container>(
            scene: Phaser.Scene, widgetConstructor): WidgetType {

        let ui = <UIScene> scene.scene.get('ui-scene');
        if (!ui) {
            return new widgetConstructor(scene);
        }
        if (ui.stack.length > 0) {
            let current = ui.stack.at(ui.stack.length-1)!;
            current.deactivate();
        }
        let widget = new widgetConstructor(ui);
        ui.stack.push(widget);
        widget.activate();
        return widget;
    }
    static popContent(scene: Phaser.Scene,
                      content: IActivatableWidget) {
        let ui = <UIScene> scene.scene.get('ui-scene');
        if (!ui) {
            return undefined;
        }
        if (ui.stack.length == 0) {
            return undefined;
        }
        ui.stack = ui.stack.filter(widget => widget !== content);
        if (ui.stack.length > 0) {
            let current = ui.stack.at(ui.stack.length-1)!;
            current.activate();
        }
        return content;
    }
}
