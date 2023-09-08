type BattlePromptProps = {
  ATK: number;
  DEF: number;
  hp: number;
};

export const battlePrompt = ({ ATK, DEF, hp }: BattlePromptProps): string => {
  const enemyATK = parseInt(process.env.NEXT_PUBLIC_DEFAULT_ENEMY_ATK!);
  const enemyDEF = parseInt(process.env.NEXT_PUBLIC_DEFAULT_ENEMY_DEF!);
  let enemyHP = parseInt(process.env.NEXT_PUBLIC_DEFAULT_ENEMY_HP!);

  let prompt = `
      갑자기 당신의 앞에 정체모를 적이 나타나서 당신을 위협합니다!<br />
      당신은 침착하게 전투를 준비합니다.<br />
      적의 ATK: ${enemyATK}, DEF: ${enemyDEF}, HP: ${enemyHP}<br />
      당신의 ATK: ${ATK}, DEF: ${DEF}, HP: ${hp}
      <br />
      <br />
    `;

  let totalDamageToEnemy = 0;
  let totalDamageToUser = 0;

  while (hp > 0 && enemyHP > 0) {
    const playerDamage = Math.max(0, ATK - enemyDEF);
    const enemyDamage = Math.max(0, enemyATK - DEF);

    enemyHP = enemyHP - playerDamage;
    hp = hp - enemyDamage;

    totalDamageToEnemy = totalDamageToEnemy + playerDamage;
    totalDamageToUser = totalDamageToUser + enemyDamage;

    prompt += `
        당신의 공격! 적에게 ${playerDamage}의 피해를 주었습니다. (적 체력: ${
      enemyHP + playerDamage
    } -> ${enemyHP})<br />
        적의 공격! 당신은 ${enemyDamage}의 피해를 받았습니다. (당신의 체력:${
      hp + enemyDamage
    } -> ${hp})<br />
      `;
  }

  if (hp > 0) {
    prompt += `
    <br />
        전투 승리!<br />
        적에게 총 ${totalDamageToEnemy}의 피해를 주었습니다.<br />
        적에게 총 ${totalDamageToUser}의 피해를 받았습니다.<br />
        남은 체력: ${hp}
        <br /><br />
      `;
  } else {
    prompt += `
    <br />
        전투 패배!
      `;
  }

  return prompt;
};
