<script>
    import { onMount } from 'svelte';

    const steps = [
        {
            icon: 'ri-layout-4-line',
            title: 'Choose Template',
            description: 'Browse through our collection of professionally designed templates and select the one that best matches your style and industry requirements.'
        },
        {
            icon: 'ri-edit-box-line',
            title: 'Fill Details',
            description: 'Use our smart editor to input your information. Our AI will help optimize your content for maximum impact and readability.'
        },
        {
            icon: 'ri-download-cloud-line',
            title: 'Download Resume',
            description: 'Preview your resume and download it in your preferred format. Your professional CV is ready to help you land your dream job.'
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

        document.querySelectorAll('.step-card').forEach((card) => {
            observer.observe(card);
        });
    });
</script>

<style>
    .step-card {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.6s ease-out;
    }

    .step-card.show {
        opacity: 1;
        transform: translateX(0);
    }
</style>

<section id="how-it-works" class="py-32 bg-white">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-24 step-card">
            <span class="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wide mb-6">HOW IT WORKS</span>
            <h2 class="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Create Your Resume <br class="hidden md:block" />in 3 Easy Steps</h2>
            <p class="text-xl opacity-75 max-w-2xl mx-auto leading-relaxed font-medium">
                Get your professional resume ready in minutes with our simple process
            </p>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-between gap-8 relative">
            {#each steps as step, index}
                <div class="step-card group w-full md:w-1/3 relative" style="transition-delay: {index * 200}ms">
                    <div class="relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary/30 transition-all duration-500">
                        <div class="flex items-start gap-6">
                            <div class="flex-shrink-0">
                                <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                                    <i class="{step.icon} text-3xl text-primary"></i>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold mb-4">{step.title}</h3>
                                <p class="opacity-75 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    {#if index < steps.length - 1}
                        <div class="hidden md:block absolute -right-12 top-1/2 -translate-y-1/2 z-10">
                            <i class="ri-arrow-right-line text-4xl text-primary/30"></i>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="text-center mt-16">
            <button class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all duration-300 font-medium group">
                Create Resume Now
                <i class="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform duration-300"></i>
            </button>
        </div>
    </div>
</section> 