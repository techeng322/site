import React, { createContext, useContext, useMemo } from 'react';
import type { CSSProperties, PropsWithChildren } from 'react';
import type {
	DraggableSyntheticListeners,
	UniqueIdentifier,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
	id: UniqueIdentifier;
}

interface Context {
	attributes: Record<string, any>;
	listeners: DraggableSyntheticListeners;
	// eslint-disable-next-line no-unused-vars
	ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
	attributes: {},
	listeners: undefined,
	ref() {},
});

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
	const {
		attributes,
		isDragging,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
	} = useSortable({ id });

	const context = useMemo(
		() => ({
			attributes,
			listeners,
			ref: setActivatorNodeRef,
		}),
		[attributes, listeners, setActivatorNodeRef]
	);

	const style: CSSProperties = {
		opacity: isDragging ? 0.4 : undefined,
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<SortableItemContext.Provider value={context}>
			<li className="list-none relative" ref={setNodeRef} style={style}>
				{children}
				<DragHandle />
			</li>
		</SortableItemContext.Provider>
	);
}

function DragHandle() {
	const { attributes, listeners, ref } = useContext(SortableItemContext);

	return (
		<button
			className="absolute top-2 left-2 inline-flex justify-center items-center w-10 h-10 rounded-full bg-gray-overlay backdrop-blur-xl cursor-grab"
			{...attributes}
			{...listeners}
			ref={ref}
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					x="19.5"
					y="6.5"
					width="3"
					height="15"
					rx="0.5"
					transform="rotate(90 19.5 6.5)"
					stroke="white"
				/>
				<rect
					x="19.5"
					y="14.5"
					width="3"
					height="15"
					rx="0.5"
					transform="rotate(90 19.5 14.5)"
					stroke="white"
				/>
			</svg>
		</button>
	);
}
