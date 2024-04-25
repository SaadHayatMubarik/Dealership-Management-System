import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { NotificationStatus } from "../notification-status.enum";
import { Inventory } from "src/modules/inventory/entity/Inventory";
import { Showroom } from "src/modules/showroom/entity/Showroom";

@Entity({ name: 'notification' })
export class Notification {

    @PrimaryGeneratedColumn()
    notification_id: number;

    @Column({ type: "enum", enum: NotificationStatus, default: NotificationStatus.PENDING })
    status: NotificationStatus;

    @Column()
    date: Date;

    @Column()
    min_value: string;

    @Column()
    max_value: string;

    @ManyToOne(() => Inventory, (inventory) => inventory.notifications)
    inventory: Inventory;

    @ManyToOne(() => Showroom, (showroom) => showroom.senderNotification)
    senderShowroom: Showroom;

    // @OneToOne(() => Showroom, (showroom) => showroom.receiverNotification)
    // receiverShowroom: Showroom;
}