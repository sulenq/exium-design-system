import type { IgtLayersResponse } from "@/design-system/components/map/types/map.type";
import { apiClient } from "@/shared/libs/api-client/api-client";
import { isDummyDataEnabled } from "@/shared/utils/env/env.utils";

export const getMapLayers = async (
  signal?: AbortSignal,
): Promise<IgtLayersResponse> => {
  try {
    const response = await apiClient.get<IgtLayersResponse>(
      "/api/v1/map-layers",
      { signal },
    );
    return response;
  } catch (error) {
    if (!isDummyDataEnabled()) {
      throw error;
    }

    return {
      items: [],
      pagination: {
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
};
