import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';

import { RcAddButtonComponent } from './rc-add-button.component';

describe('RcAddButtonComponent', () => {
    let component: RcAddButtonComponent;
    let fixture: ComponentFixture<RcAddButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatIconModule,
            ],
            declarations: [RcAddButtonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RcAddButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event with onClick call', () => {
        let subscriptionTriggered = false;
        const mockEvent = 'Event';

        component.click.subscribe(event => {
            subscriptionTriggered = true;
            expect(event).toBe(mockEvent);
        });

        component.onClick(mockEvent);

        expect(subscriptionTriggered).toBeTruthy();
    });
});
