<script>
    import { onMount } from 'svelte';

    const whyCards = [
        {
            icon: 'ri-global-line',
            title: 'International Standards',
            description: 'Create professional resumes that meet global standards and are suitable for the international job market.',
            iconColor: 'bg-primary'
        },
        {
            icon: 'ri-time-line',
            title: 'Quick & Easy',
            description: 'Create a professional resume in minutes. Our modern interface makes the process simple and efficient.',
            iconColor: 'bg-primary'
        },
        {
            icon: 'ri-file-text-line',
            title: 'ATS Friendly',
            description: 'Stand out in recruitment processes with resumes optimized for Applicant Tracking Systems.',
            iconColor: 'bg-primary'
        }
    ];

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.why-card').forEach((card) => {
            observer.observe(card);
        });
    });
</script>

<style>
    .why-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    .why-card.show {
        opacity: 1;
        transform: translateY(0);
    }
</style>

<section class="py-32">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-24 why-card">
            <span class="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wide mb-6">WHY RESUMIFY?</span>
            <h2 class="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Personalized <br class="hidden md:block" />CV Solutions</h2>
            <p class="text-xl opacity-75 max-w-2xl mx-auto leading-relaxed font-medium">
                Create professional resumes tailored to modern job market requirements
            </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
            {#each whyCards as card, i}
                <div class="why-card group" style="transition-delay: {i * 150}ms">
                    <div class="relative bg-white p-10 rounded-[2rem] border border-gray-100 hover:border-primary/30 transition-all duration-500 h-full">
                        <div class="absolute -top-7 left-10">
                            <div class="{card.iconColor} w-14 h-14 flex items-center justify-center rounded-2xl transform rotate-[10deg] group-hover:rotate-0 transition-all duration-300">
                                <i class="{card.icon} text-2xl text-white"></i>
                            </div>
                        </div>
                        <div class="pt-10">
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-2xl font-bold">{card.title}</h3>
                                <i class="ri-arrow-right-up-line text-2xl text-primary opacity-0 group-hover:opacity-100 transform -translate-x-5 group-hover:translate-x-0 transition-all duration-300"></i>
                            </div>
                            <p class="opacity-75 leading-relaxed text-[17px]">
                                {card.description}
                            </p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section> 