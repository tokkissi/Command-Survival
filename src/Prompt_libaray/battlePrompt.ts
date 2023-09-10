type BattlePromptProps = {
  ATK: number;
  DEF: number;
  hp: number;
  currentFloor: number;
};

export const battlePrompt = ({
  ATK,
  DEF,
  hp,
  currentFloor,
}: BattlePromptProps): string => {
  let enemyATK, enemyDEF, enemyHP;
  const maxFloor = parseInt(process.env.NEXT_PUBLIC_DEFAULT_MAX_FLOOR!);

  if (currentFloor === maxFloor) {
    enemyATK = parseInt(process.env.NEXT_PUBLIC_BOSS_ATK!);
    enemyDEF = parseInt(process.env.NEXT_PUBLIC_BOSS_DEF!);
    enemyHP = parseInt(process.env.NEXT_PUBLIC_BOSS_HP!);
  } else {
    enemyATK = parseInt(process.env.NEXT_PUBLIC_DEFAULT_ENEMY_ATK!);
    enemyDEF = parseInt(process.env.NEXT_PUBLIC_DEFAULT_ENEMY_DEF!);
    enemyHP = parseInt(process.env.NEXT_PUBLIC_DEFAULT_ENEMY_HP!);
  }

  let enemyLabel = currentFloor === maxFloor ? "보스" : "적";

  let prompt = `
      갑자기 당신의 앞에 정체모를 ${enemyLabel}${
    enemyLabel === "보스" ? "가" : "이"
  } 나타나서 당신을 위협합니다!<br />
      당신은 침착하게 전투를 준비합니다.<br />
      ${enemyLabel}의 ATK: ${enemyATK}, DEF: ${enemyDEF}, HP: ${enemyHP}<br />
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
    ${enemyLabel}의 공격! 당신은 ${enemyDamage}의 피해를 받았습니다. (당신의 체력:${
      hp + enemyDamage
    } -> ${hp})<br />
        당신의 공격! ${enemyLabel}에게 ${playerDamage}의 피해를 주었습니다. (${enemyLabel} 체력: ${
      enemyHP + playerDamage
    } -> ${enemyHP})<br />
      `;
  }

  if (hp > 0) {
    prompt += `
    <br />
        전투 승리!<br />
        ${enemyLabel}에게 총 ${totalDamageToEnemy}의 피해를 주었습니다.<br />
        ${enemyLabel}에게 총 ${totalDamageToUser}의 피해를 받았습니다.<br />
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
