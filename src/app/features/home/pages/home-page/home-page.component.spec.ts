import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { HomePageComponent } from './home-page.component';

const es = {
  home: {
    seoTitle: 'Inicio',
    seoDescription: 'Organiza tus tareas',
    heroTitle: 'Organiza tu día,',
    heroTitleHighlight: 'simplifica tu vida',
    heroSubtitle: 'Gestiona tus tareas',
    heroCta: 'Comenzar ahora',
    featuresTitle: 'Todo lo que necesitas',
    featuresSubtitle: 'Herramientas simples',
    featureTasksTitle: 'Gestión de tareas',
    featureTasksDesc: 'Crea, edita y elimina tareas.',
    featureCategoriesTitle: 'Categorías con color',
    featureCategoriesDesc: 'Organiza tus tareas por categorías.',
    featureFiltersTitle: 'Filtros y búsqueda',
    featureFiltersDesc: 'Encuentra tus tareas al instante.',
    stepsTitle: 'Empieza en segundos',
    stepsSubtitle: 'Solo necesitas tres pasos.',
    step1Title: 'Ingresa tu correo',
    step1Desc: 'Accede con tu correo electrónico.',
    step2Title: 'Crea tus tareas',
    step2Desc: 'Agrega tareas y categorías.',
    step3Title: 'Mantén el control',
    step3Desc: 'Filtra y marca tus tareas.',
    ctaTitle: '¿Listo para organizarte?',
    ctaSubtitle: 'Comienza a gestionar tus tareas.',
    ctaButton: 'Ir al login',
  },
};

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [
        RouterTestingModule,
        TranslocoTestingModule.forRoot({
          langs: { es },
          translocoConfig: { availableLangs: ['es'], defaultLang: 'es' },
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero section', () => {
    const heroEl = fixture.nativeElement.querySelector('.home-hero');
    expect(heroEl).toBeTruthy();
  });

  it('should render features section', () => {
    const featuresEl = fixture.nativeElement.querySelector('.home-features');
    expect(featuresEl).toBeTruthy();
  });

  it('should render steps section', () => {
    const stepsEl = fixture.nativeElement.querySelector('.home-steps');
    expect(stepsEl).toBeTruthy();
  });

  it('should render CTA section', () => {
    const ctaEl = fixture.nativeElement.querySelector('.home-cta');
    expect(ctaEl).toBeTruthy();
  });

  it('should have login links', () => {
    const links = fixture.nativeElement.querySelectorAll('a[href="/login"]');
    expect(links.length).toBe(2);
  });
});
