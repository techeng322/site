import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import type { DropAnimation } from '@dnd-kit/core';

const dropAnimationConfig: DropAnimation = {
	sideEffects: defaultDropAnimationSideEffects({
		styles: {
			active: {
				opacity: '0.2',
			},
		},
	}),
};

interface Props {}

export function SortableOverlay({ children }: PropsWithChildren<Props>) {
	return createPortal(
		<DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>,
		document.body
	);
}
