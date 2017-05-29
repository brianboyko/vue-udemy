const endgame = ({ vm, isVictory }) => {
  vm.gameOn = false;
  vm.endLabel = isVictory ? "VICTORY!" : "DEFEAT!";
  setTimeout(() => {
    vm.startGame();
  }, 5000);
};

const attack = vm => {
  let dam = Math.ceil(Math.random() * 6) + 1;
  vm.monsterHP -= dam;
  vm.log.push({ char: "player", msg: `Player attacks for ${dam} damage!` });
  if (vm.monsterHP <= 0) {
    vm.monsterHP = 0;
    endgame({
      vm,
      isVictory: true
    });
  }
};

const magic = vm => {
  let dam = Math.ceil(Math.random() * 6) + Math.ceil(Math.random() * 6);
  vm.monsterHP -= dam;
  vm.log.push({ char: "player", msg: `Player attacks for ${dam} damage!` });
  if (vm.monsterHP <= 0) {
    vm.monsterHP = 0;
    endgame({
      vm,
      isVictory: true
    });
  }
};

const heal = vm => {
  let hpup = Math.min(100 - vm.playerHP, 10);
  vm.playerHP += hpup;
  vm.log.push({
    char: "player",
    msg: `Player casts Heal and heals ${hpup} HP`
  });
};

const counter = vm => {
  if (vm.monsterHP > 0) {
    let dam = Math.ceil(Math.random() * 6) + 1;
    vm.playerHP -= dam;
    vm.log.push({
      char: "monster",
      msg: `Monster counters for ${dam} damage.`
    });
    if (vm.playerHP <= 0) {
      vm.playerHP = 0;
      endgame({
        vm,
        isVictory: false
      });
    }
  }
};

new Vue({
  el: "#app",
  data: {
    playerHP: 100,
    monsterHP: 100,
    gameOn: false,
    log: [],
    endLabel: ""
  },
  computed: {
    congrats: function() {
      return this.monsterHP >= 0 ? "VICTORY!" : "DEFEAT!";
    }
  },
  methods: {
    startGame: function() {
      this.playerHP = 100;
      this.monsterHP = 100;
      this.gameOn = true;
      this.log = [];
      this.endLabel = "";
    },
    doAttack: function() {
      attack(this);
      if (!this.gameOver) {
        counter(this);
      }
    },
    doMagic: function() {
      magic(this);
      if (!this.gameOver) {
        counter(this);
      }
    },
    doHeal: function() {
      heal(this);
      if (!this.gameOver) {
        counter(this);
      }
    }
  }
});
