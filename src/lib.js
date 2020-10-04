export const smoothOrientation = (orientationArr) => {
  const sum = orientationArr.reduce(
    (acc, cur) => {
      return {
        alpha: acc.alpha + cur.alpha,
        beta: acc.beta + cur.beta,
        gamma: acc.gamma + cur.gamma,
      };
    },
    {
      alpha: 0,
      beta: 0,
      gamma: 0,
    }
  );

  return {
    alpha: sum.alpha / (orientationArr.length || 1),
    beta: sum.beta / (orientationArr.length || 1),
    gamma: sum.gamma / (orientationArr.length || 1),
  };
};

export const smoothMouse = (mouseArr) => {
  const sum = mouseArr.reduce(
    (acc, cur) => {
      return {
        x: acc.x + cur.x,
        y: acc.y + cur.y,
      };
    },
    {
      x: 0,
      y: 0,
    }
  );

  return {
    x: sum.x / (mouseArr.length || 1),
    y: sum.y / (mouseArr.length || 1),
  };
};

export const smoothScroll = (scrollArr) => {
  if (scrollArr.length === 0) {
    return 0;
  }

  const sum = scrollArr.reduce((acc, cur) => acc + cur, 0);

  return sum / scrollArr.length;
};

export const isTouchDevice = () => {
  const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  const mq = (query) => window.matchMedia(query).matches;

  if ("ontouchstart" in window) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
    ""
  );

  return mq(query);
};

export const clamp = (min, max, value) => Math.min(Math.max(min, value), max);
