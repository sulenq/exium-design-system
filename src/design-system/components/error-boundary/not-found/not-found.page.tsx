// src/design-system/components/error-boundary/ui/not-found.page.tsx

import { Button } from "@/design-system/components/button/button/button";
import { ButtonGroup } from "@/design-system/components/button/button-group/button-group";
import FeedbackState from "@/design-system/components/feedback/feedback-state/feedback-state";
import { PageContainer } from "@/design-system/components/layout/page-container/page-container";
import { NavLink } from "@/design-system/components/navigation/link/link";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { t } from "@/shared/libs/i18n";
import { back } from "@/shared/utils/client/navigation";
import { IconMoodPuzzled } from "@tabler/icons-react";

export const NotFoundPage = () => {
  // Stores
  const { theme } = useThemeStore();

  return (
    <PageContainer>
      <FeedbackState
        icon={IconMoodPuzzled}
        title={t["error_page.not_found.title"]()}
        description={t["error_page.not_found.description"]()}
      >
        <ButtonGroup>
          <Button
            colorPalette={theme.colorPalette}
            onClick={() => {
              back();
            }}
          >
            {t["action.back"]()}
          </Button>

          <NavLink to={"/"}>
            <Button colorPalette={theme.colorPalette}>
              {t["action.back_to_main_page"]()}
            </Button>
          </NavLink>
        </ButtonGroup>
      </FeedbackState>
    </PageContainer>
  );
};
