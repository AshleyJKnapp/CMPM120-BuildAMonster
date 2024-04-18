class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        //The following body parts are tethered to the x,y of body, so they should all update position according to the body
        this.armLX = this.bodyX - 80;
        this.armLY = this.bodyY + 30;

        this.armRX = this.bodyX + 80;
        this.armRY = this.bodyY + 30;
        
        this.legLX = this.bodyX - 40
        this.legLY = this.bodyY + 70
        
        this.legRX = this.bodyX + 40;
        this.legRY = this.bodyY + 70;
        
        this.antLX = this.bodyX - 50;
        this.antLY = this.bodyY - 110;

        this.antRX = this.bodyX + 50;
        this.antRY = this.bodyY - 110;

        this.eyeLX = this.bodyX - 55;
        this.eyeLY = this.bodyY - 120;

        this.eyeRX = this.bodyX + 55;
        this.eyeRY = this.bodyY - 120;

        this.mouthX = this.bodyX;
        this.mouthY = this.bodyY - 30;

        // Event handling
        this.leftKey = null;
        this.rightKey = null;

    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2><p>&#128293&#128293&#128293 mr krabs knockoff if he were epic &#128293&#128293&#128293;</p>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        // checklist: 2+ legs (done), 2+ arms (done), 1+ eyes, 1+ mouths, 2+ accessories 

        // Arms x2
        my.sprite.armR = this.add.sprite(this.armRX, this.armRY, "monsterParts", "arm_redD.png");
        my.sprite.armL = this.add.sprite(this.armLX, this.armLY, "monsterParts", "arm_redD.png");
        my.sprite.armL.flipX = true;   // flip sprite

        // Legs x2
        my.sprite.legR = this.add.sprite(this.legRX, this.legRY, "monsterParts", "leg_redB.png");
        my.sprite.legL = this.add.sprite(this.legLX, this.legLY, "monsterParts", "leg_redB.png");
        my.sprite.legL.flipX = true;   // flip sprite

        // Body
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_redD.png");

        // Antenna x2 (actually eye detail, originally was antenna so I'm keeping the name because it is shorter)
        my.sprite.antR = this.add.sprite(this.antRX, this.antRY, "monsterParts", "detail_red_eye.png");
        my.sprite.antL = this.add.sprite(this.antLX, this.antLY, "monsterParts", "detail_red_eye.png");
        my.sprite.antL.flipX = true;   // flip sprite

        // Eye x2
        my.sprite.eyeR = this.add.sprite(this.eyeRX, this.eyeRY, "monsterParts", "eye_human.png");
        my.sprite.eyeL = this.add.sprite(this.eyeLX, this.eyeLY, "monsterParts", "eye_human.png");
        my.sprite.eyeL.flipX = true;   // flip sprite
        // angry eyes bc why not
        my.sprite.angeyeR = this.add.sprite(this.eyeRX, this.eyeRY, "monsterParts", "eye_angry_red.png");
        my.sprite.angeyeL = this.add.sprite(this.eyeLX, this.eyeLY, "monsterParts", "eye_angry_red.png");
        my.sprite.angeyeL.flipX = true;   // flip sprite
        my.sprite.angeyeR.visible = false;
        my.sprite.angeyeL.visible = false;


        // Mouth
        my.sprite.smile = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouthA.png");
        my.sprite.fangs = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.fangs.visible = false;
        

        // -------- Input handling --------
        // (S) Smile toggle event
        let sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        sKey.on('down', (key, event) => {
            // console.log("S key (event)");
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false;
            //eyes
            my.sprite.angeyeR.visible = false;
            my.sprite.angeyeL.visible = false; 
            my.sprite.eyeR.visible = true;
            my.sprite.eyeL.visible = true; 
        })

        // (F) Fangs toggle event
        let fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        fKey.on('down', (key, event) => {
            // console.log("F key (event)");
            my.sprite.smile.visible = false;
            my.sprite.fangs.visible = true;
            //eyes
            my.sprite.angeyeR.visible = true;
            my.sprite.angeyeL.visible = true; 
            my.sprite.eyeR.visible = false;
            my.sprite.eyeL.visible = false; 
        })

        // -- Movement --
        // (A) Move Left Polling
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        
        // (D) Move Right Polling
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        if (this.leftKey.isDown){
            // console.log("Moving Left");
            // x = this.input.addkey('x') makes x a listener || object on the X key
            // this.bodyX += 10;
            for (let part in my.sprite){
                my.sprite[part].x -= 5;
            }
            // my.sprite.body.x -= 5;
        }
       
        if (this.rightKey.isDown){
            // console.log("Moving Right");
            for (let part in my.sprite){
                my.sprite[part].x += 5;
            }
            // my.sprite.body.x += 5;
        }
        // console.log("Body xy is now: "+ my.sprite.body.x + ", "+ my.sprite.body.y);
    }

}