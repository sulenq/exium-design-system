// src/design-system/components/input/date-picker/date-picker.tsx

import { CalendarDate } from "@internationalized/date";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import {
  Button,
  IconButton,
} from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import type {
  DatePickerMode,
  DatePickerProps,
  DatePickerTriggerProps,
  DayViewProps,
  MonthViewProps,
  NavHeaderProps,
  YearViewProps,
} from "@/design-system/components/input/date-picker/date-picker.type";
import {
  buildCalendarGrid,
  buildTimezoneLabel,
  buildYearPage,
  formatDateLabel,
  getMonthNames,
  getSelectableBounds,
  getTodayDate,
  getWeekdayNames,
  getYearPageStart,
  parseISODate,
  resolveTimezone,
  toISODate,
  validateDate,
  YEAR_PAGE_SIZE,
} from "@/design-system/components/input/utils/date.utils";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import { Grid } from "@/design-system/components/layout/grid/grid";
import { usePopDisclosure } from "@/design-system/components/overlay/hooks/use-pop-disclosure";
import { Modal } from "@/design-system/components/overlay/modal/modal";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { CaretLeftIcon as ChevronLeftIcon, CaretRightIcon as ChevronRightIcon, GlobeIcon } from "@phosphor-icons/react";
import { getLocale, t } from "@/shared/libs/i18n";

// -------------------------------------------------------------------------------------
// Hook: useDatePickerState
// -------------------------------------------------------------------------------------

function useDatePickerState(props: DatePickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    disabledDates,
    availableDates,
    timezone,
  } = props;

  const controlled = value !== undefined;
  const tz = useMemo(() => resolveTimezone(timezone), [timezone]);
  const todayDate = useMemo(() => getTodayDate(tz), [tz]);

  // Uncontrolled fallback value
  // A single whitelisted date is preselected when uncontrolled (e.g. "today only").
  const [internalValue, setInternalValue] = useState<CalendarDate | null>(() =>
    parseISODate(
      defaultValue ??
        (Array.isArray(availableDates) && availableDates.length === 1
          ? availableDates[0]
          : undefined),
    ),
  );

  const selectedDate = useMemo<CalendarDate | null>(() => {
    if (controlled) return parseISODate(value);
    return internalValue;
  }, [controlled, internalValue, value]);

  // States
  const [viewDate, setViewDate] = useState<CalendarDate>(() => {
    if (selectedDate) return selectedDate;
    const { start, end } = getSelectableBounds({ min, max, availableDates });
    if (start && todayDate.compare(start) < 0) return start;
    if (end && todayDate.compare(end) > 0) return end;
    return todayDate;
  });
  const [datePickerMode, setDatePickerMode] = useState<DatePickerMode>("day");

  // Validation constraints
  const validationOptions = useMemo(
    () => ({ min, max, disabledDates, availableDates }),
    [min, max, disabledDates, availableDates],
  );
  const bounds = useMemo(
    () => getSelectableBounds(validationOptions),
    [validationOptions],
  );

  const isDateDisabled = useCallback(
    (date: CalendarDate): boolean =>
      !validateDate(date, validationOptions).valid,
    [validationOptions],
  );

  // Selecting a day commits immediately — no intermediate confirm step
  function selectDate(date: CalendarDate) {
    if (isDateDisabled(date)) return;

    if (!controlled) {
      setInternalValue(date);
    }
    onValueChange?.(toISODate(date));
  }

  return {
    selectedDate,
    viewDate,
    datePickerMode,
    todayDate,
    tz,
    bounds,
    isDateDisabled,
    selectDate,
    setViewDate,
    setDatePickerMode,
  };
}

// -------------------------------------------------------------------------------------
// Nav Header
// -------------------------------------------------------------------------------------

const NavHeader = memo(function NavHeader({
  label,
  onPrev,
  onNext,
  onLabelClick,
  labelClickable = false,
  prevDisabled = false,
  nextDisabled = false,
}: NavHeaderProps) {
  return (
    <HStack justify={"space-between"} align={"center"} gap={1} py={1}>
      <IconButton variant={"ghost"} aria-label={t["common.previous"]()}
        disabled={prevDisabled}
        onClick={onPrev}
      >
        <AppIcon icon={ChevronLeftIcon} />
      </IconButton>

      <Button
        flex={1}
        cursor={labelClickable ? "pointer" : "default"}
        bg={labelClickable ? "" : "none"}
        userSelect={"none"}
        onClick={labelClickable ? onLabelClick : undefined}
      >
        {label}
      </Button>

      <IconButton variant={"ghost"} aria-label={t["common.next"]()}
        disabled={nextDisabled}
        onClick={onNext}
      >
        <AppIcon icon={ChevronRightIcon} />
      </IconButton>
    </HStack>
  );
});

// -------------------------------------------------------------------------------------
// Day DatePickerMode
// -------------------------------------------------------------------------------------

const DayView = memo(function DayView(props: DayViewProps) {
  // Props
  const {
    viewDate,
    selectedDate,
    todayDate,
    isDateDisabled,
    onSelectDay,
    onPrevMonth,
    onNextMonth,
    onGoToMonthView,
    onFocusDate,
    prevMonthDisabled,
    nextMonthDisabled,
    locale,
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // Refs
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldMoveFocusRef = useRef(false);

  // Resolved Values
  const grid = useMemo(
    () => buildCalendarGrid(viewDate.year, viewDate.month),
    [viewDate.year, viewDate.month],
  );
  const monthNames = useMemo(() => getMonthNames(locale), [locale]);
  const weekdayNames = useMemo(() => getWeekdayNames(locale), [locale]);
  const label = `${monthNames[viewDate.month - 1]} ${viewDate.year}`;

  // Roving tabindex: one day in the grid is tabbable, arrows move between days.
  const [focusedDate, setFocusedDate] = useState<CalendarDate>(() => {
    if (selectedDate && selectedDate.month === viewDate.month) return selectedDate;
    if (todayDate.month === viewDate.month && todayDate.year === viewDate.year)
      return todayDate;
    return viewDate.set({ day: 1 });
  });
  const focusedIso = toISODate(focusedDate);

  // Keep the tabbable day inside the visible month when navigating with the header buttons
  const [prevViewKey, setPrevViewKey] = useState(`${viewDate.year}-${viewDate.month}`);
  const viewKey = `${viewDate.year}-${viewDate.month}`;
  if (prevViewKey !== viewKey) {
    setPrevViewKey(viewKey);
    if (
      focusedDate.month !== viewDate.month ||
      focusedDate.year !== viewDate.year
    ) {
      setFocusedDate(viewDate.set({ day: 1 }));
    }
  }

  useEffect(() => {
    if (!shouldMoveFocusRef.current) return;
    shouldMoveFocusRef.current = false;
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-iso="${focusedIso}"]`)
      ?.focus();
  }, [focusedIso, viewKey]);

  function moveFocus(next: CalendarDate) {
    shouldMoveFocusRef.current = true;
    setFocusedDate(next);
    onFocusDate(next);
  }

  function handleGridKeyDown(event: KeyboardEvent, date: CalendarDate, disabled: boolean) {
    const moves: Record<string, () => CalendarDate> = {
      ArrowLeft: () => date.subtract({ days: 1 }),
      ArrowRight: () => date.add({ days: 1 }),
      ArrowUp: () => date.subtract({ weeks: 1 }),
      ArrowDown: () => date.add({ weeks: 1 }),
      Home: () => date.subtract({ days: date.toDate("UTC").getUTCDay() }),
      End: () => date.add({ days: 6 - date.toDate("UTC").getUTCDay() }),
      PageUp: () => date.subtract({ months: 1 }),
      PageDown: () => date.add({ months: 1 }),
    };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      moveFocus(move());
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && !disabled) {
      event.preventDefault();
      onSelectDay(date);
    }
  }

  return (
    <VStack gap={4}>
      <NavHeader
        label={label}
        onPrev={onPrevMonth}
        onNext={onNextMonth}
        onLabelClick={onGoToMonthView}
        labelClickable
        prevDisabled={prevMonthDisabled}
        nextDisabled={nextMonthDisabled}
      />

      {/* Calendar grid */}
      <VStack ref={gridRef} gap={2} role={"group"} aria-label={label}>
        {/* Day-of-week header */}
        <HStack justify={"space-between"} aria-hidden={true}>
          {weekdayNames.map((d, index) => (
            <P
              key={index}
              w={"40px"}
              color={"fg.muted"}
              fontWeight={"medium"}
              textAlign={"center"}
            >
              {d}
            </P>
          ))}
        </HStack>

        {grid.map((week, wi) => (
          <HStack key={wi} justify={"space-between"}>
            {week.map((cell) => {
              const iso = toISODate(cell.date);
              const isSelected = selectedDate
                ? toISODate(selectedDate) === iso
                : false;
              const isToday = toISODate(todayDate) === iso;
              const disabled = isDateDisabled(cell.date);
              const dimmed = !cell.isCurrentMonth;

              return (
                <Button
                  key={iso}
                  variant={isSelected ? "subtle" : "ghost"}
                  w={"40px"}
                  h={"40px"}
                  p={0}
                  rounded={theme.radii.component}
                  color={
                    dimmed && !isSelected
                      ? "fg.subtle"
                      : disabled
                        ? "fg.subtle"
                        : "fg"
                  }
                  data-iso={iso}
                  tabIndex={iso === focusedIso ? 0 : -1}
                  onClick={() => !disabled && onSelectDay(cell.date)}
                  onFocus={() => {
                    if (iso !== focusedIso) setFocusedDate(cell.date);
                  }}
                  onKeyDown={(e: KeyboardEvent) =>
                    handleGridKeyDown(e, cell.date, disabled)
                  }
                  aria-label={formatDateLabel(cell.date, locale)}
                  aria-pressed={isSelected}
                  aria-current={isToday ? "date" : undefined}
                  aria-disabled={disabled}
                  cursor={disabled ? "not-allowed" : undefined}
                >
                  <P
                    fontWeight={isToday || isSelected ? "semibold" : "normal"}
                    lineHeight={1}
                    py={1}
                    borderBottom={"2px solid"}
                    borderColor={
                      isToday ? `${theme.colorPalette}.solid` : "transparent"
                    }
                  >
                    {cell.date.day}
                  </P>
                </Button>
              );
            })}
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
});

// -------------------------------------------------------------------------------------
// Month DatePickerMode
// -------------------------------------------------------------------------------------

const MonthView = memo(function MonthView(props: MonthViewProps) {
  // Props
  const {
    viewDate,
    onSelectMonth,
    onPrevYear,
    onNextYear,
    onGoToYearView,
    locale,
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // Resolved Values
  const monthNames = useMemo(() => getMonthNames(locale, "short"), [locale]);

  return (
    <VStack gap={2}>
      <NavHeader
        label={String(viewDate.year)}
        onPrev={onPrevYear}
        onNext={onNextYear}
        onLabelClick={onGoToYearView}
        labelClickable
      />

      <Grid gridTemplateColumns={"repeat(3, 1fr)"} gap={1}>
        {monthNames.map((name, i) => {
          const monthNum = i + 1;
          const isActive = viewDate.month === monthNum;

          return (
            <Button
              key={name}
              h={"40px"}
              rounded={theme.radii.component}
              variant={isActive ? "subtle" : "ghost"}
              onClick={() => onSelectMonth(monthNum)}
              aria-label={name}
              aria-pressed={isActive}
            >
              <P fontWeight={isActive ? "semibold" : "normal"}>{name}</P>
            </Button>
          );
        })}
      </Grid>
    </VStack>
  );
});

// -------------------------------------------------------------------------------------
// Year DatePickerMode
// -------------------------------------------------------------------------------------

const YearView = memo(function YearView(props: YearViewProps) {
  // Props
  const { viewDate, onSelectYear, yearPageStart, onPrevPage, onNextPage } =
    props;

  // Stores
  const { theme } = useThemeStore();

  // Resolved Values
  const years = useMemo(() => buildYearPage(yearPageStart), [yearPageStart]);
  const label = `${yearPageStart} - ${yearPageStart + YEAR_PAGE_SIZE - 1}`;

  return (
    <VStack gap={2}>
      <NavHeader label={label} onPrev={onPrevPage} onNext={onNextPage} />

      <Grid gridTemplateColumns={"repeat(4, 1fr)"} gap={1}>
        {years.map((y) => {
          const isActive = viewDate.year === y;

          return (
            <Button
              key={y}
              variant={isActive ? "subtle" : "ghost"}
              rounded={theme.radii.component}
              onClick={() => onSelectYear(y)}
              aria-label={String(y)}
              aria-pressed={isActive}
            >
              <P fontWeight={isActive ? "semibold" : "normal"}>{y}</P>
            </Button>
          );
        })}
      </Grid>
    </VStack>
  );
});

// -------------------------------------------------------------------------------------
// DatePicker (public)
// -------------------------------------------------------------------------------------

export const DatePicker = memo(function DatePicker(props: DatePickerProps) {
  // Props
  const {
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    disabledDates,
    availableDates,
    timezone,
    disabled,
    locale: localeProp,
    inputFormat: _inputFormat,
    ...restProps
  } = props;

  // Derived Values
  const locale = localeProp ?? getLocale();

  // Hooks
  const {
    selectedDate,
    viewDate,
    datePickerMode,
    todayDate,
    tz,
    bounds,
    isDateDisabled,
    selectDate,
    setViewDate,
    setDatePickerMode,
  } = useDatePickerState({
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    disabledDates,
    availableDates,
    timezone,
  });

  // Month navigation stops at the first and last month that still has a selectable date
  const prevMonthDisabled = Boolean(
    bounds.start &&
      viewDate.year * 12 + viewDate.month <=
        bounds.start.year * 12 + bounds.start.month,
  );
  const nextMonthDisabled = Boolean(
    bounds.end &&
      viewDate.year * 12 + viewDate.month >=
        bounds.end.year * 12 + bounds.end.month,
  );

  const [yearPageStart, setYearPageStart] = useState(() =>
    getYearPageStart(viewDate.year),
  );

  // Keep year page in sync with datePickerMode when switching
  const [prevDatePickerMode, setPrevDatePickerMode] = useState(datePickerMode);
  if (prevDatePickerMode !== datePickerMode) {
    setPrevDatePickerMode(datePickerMode);
    if (datePickerMode === "year") {
      setYearPageStart(getYearPageStart(viewDate.year));
    }
  }

  // Navigation helpers
  function prevMonth() {
    setViewDate((v) =>
      v.month === 1
        ? v.set({ year: v.year - 1, month: 12 })
        : v.set({ month: v.month - 1 }),
    );
  }
  function nextMonth() {
    setViewDate((v) =>
      v.month === 12
        ? v.set({ year: v.year + 1, month: 1 })
        : v.set({ month: v.month + 1 }),
    );
  }

  function prevYear() {
    setViewDate((v) => v.set({ year: v.year - 1 }));
  }
  function nextYear() {
    setViewDate((v) => v.set({ year: v.year + 1 }));
  }

  function prevYearPage() {
    setYearPageStart((p) => p - YEAR_PAGE_SIZE);
  }
  function nextYearPage() {
    setYearPageStart((p) => p + YEAR_PAGE_SIZE);
  }

  function handleSelectMonth(month: number) {
    setViewDate((v) => v.set({ month }));
    setDatePickerMode("day");
  }

  function handleSelectYear(year: number) {
    setViewDate((v) => v.set({ year }));
    setDatePickerMode("month");
  }

  // function goToToday() {
  //   setViewDate(todayDate);
  //   setDatePickerMode("day");
  // }

  const timezoneLabel = useMemo(() => buildTimezoneLabel(tz), [tz]);

  return (
    <VStack
      w={"full"}
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? "none" : undefined}
      {...restProps}
    >
      {/* Calendar body */}
      <VStack gap={4} w={"full"}>
        {datePickerMode === "day" && (
          <DayView
            viewDate={viewDate}
            selectedDate={selectedDate}
            todayDate={todayDate}
            isDateDisabled={isDateDisabled}
            onSelectDay={selectDate}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onGoToMonthView={() => setDatePickerMode("month")}
            onFocusDate={(date) => {
              if (date.month !== viewDate.month || date.year !== viewDate.year) {
                setViewDate(date.set({ day: 1 }));
              }
            }}
            prevMonthDisabled={prevMonthDisabled}
            nextMonthDisabled={nextMonthDisabled}
            locale={locale}
          />
        )}

        {datePickerMode === "month" && (
          <MonthView
            viewDate={viewDate}
            onSelectMonth={handleSelectMonth}
            onPrevYear={prevYear}
            onNextYear={nextYear}
            onGoToYearView={() => setDatePickerMode("year")}
            locale={locale}
          />
        )}

        {datePickerMode === "year" && (
          <YearView
            viewDate={viewDate}
            onSelectYear={handleSelectYear}
            yearPageStart={yearPageStart}
            onPrevPage={prevYearPage}
            onNextPage={nextYearPage}
          />
        )}

        <HStack align={"center"} justify={"space-between"} p={1}>
          <HStack align={"center"} gap={2} color={"fg.muted"}>
            <AppIcon icon={GlobeIcon} size={"sm"} />

            <P lineClamp={1} fontSize={"sm"}>{timezoneLabel}</P>
          </HStack>

          {/* <Button
            size={"xs"}
            cursor={"pointer"}
            userSelect={"none"}
            onClick={goToToday}
          >
            <P>{t["common.go_to_today"]()}</P>
          </Button> */}
        </HStack>
      </VStack>
    </VStack>
  );
});

// -------------------------------------------------------------------------------------
// DatePickerTrigger (public)
// -------------------------------------------------------------------------------------


export const DatePickerTrigger = memo(function DatePickerTrigger(
  props: DatePickerTriggerProps,
) {
  const {
    children,
    modalKey: propsModalKey = "",
    datePickerSubtitle,
    value,
    onValueChange,
    min,
    max,
    disabledDates,
    availableDates,
    timezone,
    locale,
    inputFormat,
    ...restProps
  } = props;

  const { modalKey, isOpen, open, close } = usePopDisclosure({
    modalKey: propsModalKey,
  });

  if (!modalKey) return <>{children}</>;

  return (
    <Modal.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      size={"sm"}
    >
      <Modal.Trigger>{children}</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <VStack gap={1} mx={"auto"}>
            <Modal.Title fontWeight={"semibold"}>{t["common.select_date"]()}</Modal.Title>

            {/* TODO: make the subtitle dynamic based on props */}
            {datePickerSubtitle && (
              <P fontSize={"sm"} textAlign={"center"} color={"fg.muted"}>
                {datePickerSubtitle}
              </P>
            )}
          </VStack>

          <Modal.CloseButton mb={"auto"} />
        </Modal.Header>

        <Modal.Body pt={0}>
          <DatePicker
            value={value}
            onValueChange={(val) => {
              onValueChange?.(val);
              close();
            }}
            min={min}
            max={max}
            disabledDates={disabledDates}
            availableDates={availableDates}
            timezone={timezone}
            locale={locale}
            inputFormat={inputFormat}
            {...restProps}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
});
