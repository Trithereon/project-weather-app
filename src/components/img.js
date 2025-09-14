// Weather Icon loading module.

export async function loadIcon(name) {
  try {
    const img = await import(`../img/weathericons/${name}.svg`);
    return img.default;
  } catch (err) {
    throw new Error(err);
  }
}

// Converting my static img imports into a dynamic import for practice.
