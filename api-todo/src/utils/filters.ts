export function applyFilters(
  filtersMap: Record<string, any>,
  where: any,
  logger: any,
  context: string,
) {
  Object.keys(filtersMap).forEach((key) => {
    const filter = filtersMap[key];
    if (filter.value !== undefined && filter.value !== null) {
      where[key] = filter.apply(filter.value);

      logger.debug(
        `Filtro aplicado: ${filter.logMessage}`,
        `${context} | FILTRO`,
      );
    }
  });

  return where;
}
