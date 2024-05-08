import {
    BrnAccordionContentComponent,
    BrnAccordionDirective,
    BrnAccordionItemDirective,
    BrnAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-brain'
import {
    HlmAccordionContentDirective,
    HlmAccordionDirective,
    HlmAccordionIconDirective,
    HlmAccordionImports,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm'
import { HlmAlertImports } from '@spartan-ng/ui-alert-helm'
import {
    BrnAlertDialogComponent,
    BrnAlertDialogContentDirective,
    BrnAlertDialogDescriptionDirective,
    BrnAlertDialogOverlayComponent,
    BrnAlertDialogTitleDirective,
    BrnAlertDialogTriggerDirective,
} from '@spartan-ng/ui-alertdialog-brain'
import { HlmAlertDialogImports } from '@spartan-ng/ui-alertdialog-helm'
import { HlmAvatarImports } from '@spartan-ng/ui-avatar-helm'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import {
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardImports,
    HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm'
import { BrnCheckboxComponent } from '@spartan-ng/ui-checkbox-brain'
import { HlmCheckboxImports } from '@spartan-ng/ui-checkbox-helm'
import {
    BrnCollapsibleComponent,
    BrnCollapsibleContentComponent,
    BrnCollapsibleImports,
    BrnCollapsibleTriggerDirective,
} from '@spartan-ng/ui-collapsible-brain'
import {
    BrnCommandComponent,
    BrnCommandEmptyDirective,
    BrnCommandGroupComponent,
    BrnCommandImports,
    BrnCommandInputDirective,
    BrnCommandItemDirective,
    BrnCommandListComponent,
    BrnCommandLoaderDirective,
    BrnCommandSeparatorComponent,
} from '@spartan-ng/ui-command-brain'
import { HlmCommandImports } from '@spartan-ng/ui-command-helm'
import {
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain'
import { HlmDialogImports } from '@spartan-ng/ui-dialog-helm'
import { BrnHoverCardModule } from '@spartan-ng/ui-hovercard-brain'
import { HlmHoverCardImports } from '@spartan-ng/ui-hovercard-helm'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import {
    BrnContextMenuTriggerDirective,
    BrnMenuBarImports,
    BrnMenuImports,
    BrnMenuTriggerDirective,
} from '@spartan-ng/ui-menu-brain'
import { HlmMenuBarImports, HlmMenuImports } from '@spartan-ng/ui-menu-helm'
import {
    BrnPopoverCloseDirective,
    BrnPopoverComponent,
    BrnPopoverContentDirective,
    BrnPopoverImports,
    BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain'
import {
    HlmPopoverContentDirective,
    HlmPopoverImports,
} from '@spartan-ng/ui-popover-helm'
import {
    BrnProgressComponent,
    BrnProgressImports,
    BrnProgressIndicatorComponent,
} from '@spartan-ng/ui-progress-brain'
import { HlmProgressImports } from '@spartan-ng/ui-progress-helm'
import {
    BrnRadioComponent,
    BrnRadioGroupComponent,
    BrnRadioGroupImports,
} from '@spartan-ng/ui-radiogroup-brain'
import { HlmRadioGroupImports } from '@spartan-ng/ui-radiogroup-helm'
import { BrnSelectImports } from '@spartan-ng/ui-select-brain'
import { HlmSelectImports } from '@spartan-ng/ui-select-helm'
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain'
import { BrnSheetImports } from '@spartan-ng/ui-sheet-brain'
import { HlmSheetImports } from '@spartan-ng/ui-sheet-helm'
import {
    BrnSwitchComponent,
    BrnSwitchImports,
    BrnSwitchThumbComponent,
} from '@spartan-ng/ui-switch-brain'
import { HlmSwitchImports } from '@spartan-ng/ui-switch-helm'
import { BrnTableImports, BrnTableModule } from '@spartan-ng/ui-table-brain'
import { HlmTableImports } from '@spartan-ng/ui-table-helm'
import { BrnTabsDirective } from '@spartan-ng/ui-tabs-brain'
import { HlmTabsImports } from '@spartan-ng/ui-tabs-helm'
import { BrnToggleModule } from '@spartan-ng/ui-toggle-brain'
import { BrnTooltipImports } from '@spartan-ng/ui-tooltip-brain'
import { HlmTooltipImports } from '@spartan-ng/ui-tooltip-helm'
import {
    HlmBlockquoteDirective,
    HlmCodeDirective,
    HlmH1Directive,
    HlmLargeDirective,
    HlmLeadDirective,
    HlmMutedDirective,
    HlmPDirective,
    HlmSmallDirective,
    HlmUlDirective,
} from '@spartan-ng/ui-typography-helm'

export const BrainImports = [
    BrnAccordionContentComponent,
    BrnAccordionDirective,
    BrnAccordionItemDirective,
    BrnAccordionTriggerDirective,
    BrnAlertDialogComponent,
    BrnAlertDialogContentDirective,
    BrnAlertDialogDescriptionDirective,
    BrnAlertDialogOverlayComponent,
    BrnAlertDialogTitleDirective,
    BrnAlertDialogTriggerDirective,
    BrnCheckboxComponent,
    BrnCollapsibleComponent,
    BrnCollapsibleContentComponent,
    BrnCollapsibleTriggerDirective,
    BrnCommandComponent,
    BrnCommandEmptyDirective,
    BrnCommandGroupComponent,
    BrnCommandInputDirective,
    BrnCommandItemDirective,
    BrnCommandListComponent,
    BrnCommandLoaderDirective,
    BrnCommandSeparatorComponent,
    BrnContextMenuTriggerDirective,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    BrnHoverCardModule,
    BrnMenuTriggerDirective,
    BrnPopoverCloseDirective,
    BrnPopoverComponent,
    BrnPopoverContentDirective,
    BrnPopoverTriggerDirective,
    BrnProgressComponent,
    BrnProgressIndicatorComponent,
    BrnRadioComponent,
    BrnRadioGroupComponent,
    BrnSeparatorComponent,
    BrnSwitchComponent,
    BrnSwitchThumbComponent,
    BrnTableModule,
    BrnTabsDirective,
    BrnToggleModule,

    // ...BrnCollapsibleImports,
    // ...BrnCommandImports,
    // ...BrnMenuBarImports,
    // ...BrnMenuImports,
    // ...BrnPopoverImports,
    // ...BrnProgressImports,
    // ...BrnRadioGroupImports,
    // ...BrnSelectImports,
    // ...BrnSheetImports,
    // ...BrnSwitchImports,
    // ...BrnTableImports,
    // ...BrnTooltipImports,
]

export const HelmImports = [
    ...HlmAccordionImports,
    ...HlmAlertDialogImports,
    ...HlmAlertImports,
    ...HlmAvatarImports,
    ...HlmCardImports,
    ...HlmCheckboxImports,
    ...HlmDialogImports,
    ...HlmHoverCardImports,
    ...HlmMenuBarImports,
    ...HlmMenuImports,
    ...HlmPopoverImports,
    ...HlmProgressImports,
    ...HlmRadioGroupImports,
    ...HlmSelectImports,
    ...HlmSheetImports,
    ...HlmSwitchImports,
    ...HlmTooltipImports,
    ...HlmTabsImports,
    ...HlmTableImports,

    // components and directives

    HlmAccordionContentDirective,
    HlmAccordionDirective,
    HlmAccordionIconDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCommandImports,
    HlmIconComponent,
    HlmPopoverContentDirective,
    HlmPopoverContentDirective,
]

export const SpartanTypographyDirectives = [
    HlmBlockquoteDirective,
    HlmCodeDirective,
    HlmH1Directive,
    HlmLargeDirective,
    HlmLeadDirective,
    HlmMutedDirective,
    HlmPDirective,
    HlmSmallDirective,
    HlmUlDirective,
]

export const SpartanModules = [
    ...HelmImports,
    ...BrainImports,
    ...SpartanTypographyDirectives,
]
