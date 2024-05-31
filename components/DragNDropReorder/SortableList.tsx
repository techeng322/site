import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import type { Active, UniqueIdentifier } from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { SortableOverlay } from './SortableOverlay';
import { SortableItem } from './SortableItem';

interface BaseItem {
	id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
	items: T[];
	// eslint-disable-next-line no-unused-vars
	onChange(items: T[]): void;
	// eslint-disable-next-line no-unused-vars
	renderItem(item: T): ReactNode;
}

export function SortableList<T extends BaseItem>({
	items,
	onChange,
	renderItem,
}: Props<T>) {
	const [active, setActive] = useState<Active | null>(null);

	const activeItem = useMemo(
		() => items.find((item) => item.id === active?.id),
		[active, items]
	);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
		<DndContext
			sensors={sensors}
			onDragStart={({ active }) => {
				setActive(active);
			}}
			onDragEnd={({ active, over }) => {
				if (over && active.id !== over?.id) {
					const activeIndex = items.findIndex(({ id }) => id === active.id);
					const overIndex = items.findIndex(({ id }) => id === over.id);
					onChange(arrayMove(items, activeIndex, overIndex));
				}
				setActive(null);
			}}
			onDragCancel={() => {
				setActive(null);
			}}
		>
			<SortableContext items={items}>
				<ul
					className="list-none grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
					role="application"
				>
					{items.map((item) => (
						<React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
					))}
				</ul>
			</SortableContext>
			{activeItem && (
				<SortableOverlay>{renderItem(activeItem)}</SortableOverlay>
			)}
		</DndContext>
	);
}

SortableList.Item = SortableItem;
