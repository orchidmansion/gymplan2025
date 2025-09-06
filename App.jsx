import React, { useState, useEffect } from 'react';

// --- Exercise Data ---
// This object holds all the information for your workout regime,
// including warm-up, cool-down, and exercises for each day.
// Each exercise also includes a prompt for image generation.
const regimeData = {
    general: {
        disclaimer: `I am an AI and cannot provide medical advice. Before starting any new exercise program, it is crucial that you **consult with your doctor and physiotherapist**. They can advise on any limitations or modifications necessary to ensure your safety and well-being.`,
        principles: [
            `**Consult Your Physiotherapist:** This is paramount. Ensure any exercises are cleared or modified by a healthcare professional.`,
            `**Warm-up (5-10 minutes before each session):** Essential. Include light cardio and dynamic stretches. Focus on preparing the hips, quads, and spine.`,
            `**Cool-down (5-10 minutes after each session):** Focus on static stretching, holding each stretch for 20-30 seconds. Prioritize areas of tightness (hips, inner thighs, quads, chest, neck).`,
            `**Form Over Weight/Reps:** Especially critical with tendinopathy. Perform all exercises with controlled movements. If you feel pain, reduce the weight/resistance or range of motion.`,
            `**Progressive Overload (Gradual Loading):** As per your physio's advice, gradually increase weight, reps, or sets *only when you can perform the current load without aggravating pain*.`,
            `**Listen to Your Body:** Distinguish between muscle fatigue and pain. If you experience sharp pain, stop the exercise.`,
            `**Breathing:** Maintain consistent, controlled breathing throughout all exercises. Avoid holding your breath.`,
            `**Pain Management:** Remember to apply heat pack and topical analgesics as needed, especially before or after sessions if pain is present.`,
        ],
        schedule: [
            `**Monday:** Full Body Gym Day 1 (Focus on Quadriceps Loading & Hip Strength)`,
            `**Tuesday:** Rest or Active Recovery (Light walk, gentle stretching)`,
            `**Wednesday:** At-Home Bodyweight & Mobility Day (Focus on Core, Hips & Flexibility)`,
            `**Thursday:** Rest or Active Recovery (Light walk, gentle stretching)`,
            `**Friday:** Full Body Gym Day 2 (Focus on Posterior Chain, Unilateral & Upper Body)`,
            `**Saturday/Sunday:** Rest or Active Recovery (Foam rolling, longer stretching sessions)`,
        ],
        concerns: {
            title: "Addressing Your Specific Concerns",
            items: [
                {
                    heading: "Left Quadriceps Tendinopathy:",
                    details: `The focus will be on *gradual loading* of the quadriceps and surrounding muscles, ensuring no aggravation of pain. We'll integrate the "Knee extension machine" and "Lunge - weights" with this in mind.`,
                },
                {
                    heading: "Hip & Inner Thigh Soreness:",
                    details: `Exercises like "Hip Abduction Machine," "Hip Adduction Machine," "Bridge with resisted hip abduction," and "Clam shells" directly address these. We'll also include foam rolling.`,
                },
                {
                    heading: "Left-Sided Tension:",
                    details: `Exercises that promote upper back strength and mobility, and stretches for the chest and neck, will be included.`,
                },
                {
                    heading: "\"Keep Moving\" & \"Ongoing Exercise Program\":",
                    details: `This regime provides a structured way to consistently move and load your body.`,
                },
            ],
        },
        progression: {
            title: "Progression and When to Adjust",
            items: [
                `**Start Slowly:** Begin with the lower end of the recommended reps and sets. Focus on perfect form.`,
                `**Increase Reps/Sets:** Once you can comfortably complete all sets and reps with good form, aim for the higher end of the rep range, or add an extra set (e.g., 4 sets instead of 3).`,
                `**Increase Weight:** When you consistently hit the higher end of your rep range with good form, increase the weight slightly.`,
                `**Listen to Your Body:** If any exercise causes discomfort or aggravates your condition, stop that exercise and explore alternatives.`,
                `**Consider a Personal Trainer:** Even a few sessions with a qualified personal trainer can be highly beneficial. They can assess your form, modify exercises for your specific needs, and ensure you're performing movements safely.`,
            ],
        },
    },
    warmup: {
        title: "Warm-up for All Days (5-10 minutes)",
        description: `Perform each movement in a controlled manner, listening to your body, and avoiding any sharp pain.`,
        exercises: [
            {
                name: "Light Cardio",
                setsReps: "3-5 minutes",
                howTo: "Brisk walk on treadmill, stationary bike, or elliptical.",
                why: "To get your heart rate up and blood flowing, preparing your cardiovascular system and muscles for activity.",
                imagePrompt: "A male person doing light cardio on a stationary bike in a gym setting. Full body shot, clear focus on activity.",
            },
            {
                name: "Leg Swings (Front-to-Back)",
                setsReps: "10-15 swings per leg",
                howTo: "Stand tall, lightly hold onto something for balance, and swing one leg forward and backward in a controlled motion.",
                why: "Improves hip flexor and hamstring mobility, warming up the hip joint.",
                imagePrompt: "A male person performing front-to-back leg swings, holding onto a support. Full body shot, gym setting.",
            },
            {
                name: "Leg Swings (Side-to-Side)",
                setsReps: "10-15 swings per leg",
                howTo: "Face forward, hold on for balance, and swing one leg out to the side and across your body. This targets the inner and outer thighs.",
                why: "Dynamically stretches the inner and outer thighs and improves hip abduction/adduction mobility.",
                imagePrompt: "A male person performing side-to-side leg swings, holding onto a support. Full body shot, gym setting.",
            },
            {
                name: "Lunging Hip Flexor Stretch",
                setsReps: "5-8 reps per leg",
                howTo: "Step forward into a lunge position, dropping your back knee towards the ground. Keep your torso upright and gently push your hips forward to feel a stretch in the front of the hip of the back leg. Return to standing and alternate legs.",
                why: "Dynamically stretches the hip flexors, which can become tight from prolonged sitting, improving hip extension and overall mobility.",
                imagePrompt: "A male person performing a dynamic lunging hip flexor stretch. Full body shot, gym setting.",
            },
            {
                name: "Hip Circles",
                setsReps: "5-10 circles in each direction per leg",
                howTo: "Lift one knee up to hip height, then rotate it outwards and downwards as if drawing a circle with your knee. Repeat inwards.",
                why: "Improves hip joint mobility and warms up the hip rotators.",
                imagePrompt: "A male person performing hip circles, lifting one knee and rotating it. Full body shot, gym setting.",
            },
            {
                name: "Torso Twists (Standing)",
                setsReps: "10-15 twists per side",
                howTo: "Stand with feet shoulder-width apart, knees slightly bent, and gently rotate your torso from side to side, allowing your arms to swing naturally.",
                why: "Warms up the spine and core muscles, improving thoracic mobility.",
                imagePrompt: "A male person performing standing torso twists. Full body shot, gym setting.",
            },
            {
                name: "Arm Circles",
                setsReps: "10-15 forward and 10-15 backward with each arm",
                howTo: "Perform large circles with your arms, either one arm at a time or both together, moving forward then backward.",
                why: "Warms up the shoulder joints and upper back muscles.",
                imagePrompt: "A male person performing arm circles. Full body shot, gym setting.",
            },
        ],
    },
    coolDown: {
        title: "Cool-down & Stretching for All Days (5-10 minutes)",
        description: `Focus on static stretching, holding each stretch for 20-30 seconds. Prioritize areas of tightness (hips, inner thighs, quads, chest, neck).`,
        exercises: [
            {
                name: "Quadriceps Foam Roll",
                setsReps: "1 set, 1 minute duration",
                howTo: "Lie on your front and place the foam roller underneath your leg. Bend the opposite leg and bring it out to the side to help you move back and forth. Roll the entire length of the thigh muscle, staying off the knee joint. Focus on the affected quad.",
                why: "Releases tension and improves flexibility in the quadriceps, aiding recovery for tendinopathy.",
                imagePrompt: "A male person performing a quadriceps foam roll on a mat. Full body shot, gym setting.",
            },
            {
                name: "Gluteal Foam Rolling",
                setsReps: "1 set, 30s duration",
                howTo: "Place a foam roller on the floor and position your affected buttock on the roller. Using your arms, move your buttock forwards and backwards over the roller. You can vary the amount of pressure. Focus on the affected side.",
                why: "Releases tension in the glutes, improving hip mobility and reducing soreness.",
                imagePrompt: "A male person performing gluteal foam rolling on a mat. Full body shot, gym setting.",
            },
            {
                name: "Gluteal Stretch in Sitting",
                setsReps: "2 sets of 10 reps, 3s hold",
                howTo: "Sit upright in a chair. Cross the ankle of the affected leg over the opposite thigh just above the knee. Lean forwards, bending from the hip. Increase the stretch by placing your hand on the inside of the affected knee, and apply some downwards pressure. Do not round your back whilst you hold this position.",
                why: "Stretches the glutes and external hip rotators, improving hip flexibility.",
                imagePrompt: "A male person performing a gluteal stretch while sitting on a chair. Full body shot, gym setting.",
            },
            {
                name: "Kneeling Hip Flexor Stretch",
                setsReps: "2 sets of 30s hold per side",
                howTo: "Kneel on one knee with the other foot flat on the floor in front of you (like a lunge position). Gently push your hips forward, keeping your torso upright, until you feel a stretch in the front of the hip of the kneeling leg.",
                why: "Crucial for desk-bound individuals to lengthen tight hip flexors, improving posture and reducing hip soreness.",
                imagePrompt: "A male person performing a kneeling hip flexor stretch. Full body shot, gym setting.",
            },
            {
                name: "Pec Stretch (Doorway Stretch)",
                setsReps: "2 sets of 30s hold",
                howTo: "Stand in a doorway with your forearm on the doorframe, elbow bent at 90 degrees. Gently lean forward through the doorway until you feel a stretch across your chest. Repeat on both sides.",
                why: "Addresses tightness in the chest muscles, which can contribute to rounded shoulders and left chest tension.",
                imagePrompt: "A male person performing a pec stretch in a doorway. Full body shot, gym setting.",
            },
            {
                name: "Neck Stretches (Gentle Tilts/Rotations)",
                setsReps: "2 sets of 20-30s hold per side",
                howTo: "Gently tilt your head to one side, bringing your ear towards your shoulder. Hold. Then gently rotate your head to look over one shoulder. Hold. Repeat on the other side.",
                why: "Relieves tension in the neck muscles, addressing your neck tension.",
                imagePrompt: "A male person performing gentle neck tilts and rotations. Close-up on head and shoulders, gym setting.",
            },
            {
                name: "Butterfly Stretch (Seated)",
                setsReps: "2 sets of 30s hold",
                howTo: "Sit on the floor with the soles of your feet together and knees bent out to the sides. Hold onto your feet and gently press your knees towards the floor with your elbows. Lean forward slightly from the hips.",
                why: "Excellent for inner thigh flexibility and hip mobility.",
                imagePrompt: "A male person performing a seated butterfly stretch on a mat. Full body shot, gym setting.",
            },
            {
                name: "Figure-4 Stretch (Supine or Seated)",
                setsReps: "2 sets of 30s hold per side",
                howTo: "**Supine:** Lie on your back, bend knees, feet flat. Cross one ankle over the opposite knee. Gently pull the bottom knee towards your chest. **Seated:** Sit upright, cross one ankle over the opposite knee. Gently lean forward.",
                why: "Targets the glutes and outer hip muscles, improving hip flexibility and reducing soreness.",
                imagePrompt: "A male person performing a supine figure-4 stretch on a mat. Full body shot, gym setting.",
            },
            {
                name: "Child's Pose",
                setsReps: "1-2 minutes",
                howTo: "Kneel on the floor, big toes touching, knees wide. Sit back on your heels and fold forward, resting your torso between your thighs. Extend arms forward or back by your sides. Rest your forehead on the floor.",
                why: "Gentle stretch for the back, hips, and shoulders, promoting relaxation.",
                imagePrompt: "A male person performing child's pose on a mat. Full body shot, gym setting.",
            },
            {
                name: "Hamstring Stretch (Standing or Seated)",
                setsReps: "2 sets of 30s hold per side",
                howTo: "**Standing:** Place one heel on a slightly elevated surface (e.g., bench). Keep leg straight, hinge at hips, reaching towards toes. **Seated:** Sit with one leg extended, reach towards toes, keeping back straight.",
                why: "Stretches the hamstrings, which can become tight from prolonged sitting.",
                imagePrompt: "A male person performing a standing hamstring stretch with one foot on a bench. Full body shot, gym setting.",
            },
            {
                name: "Thoracic Spine Rotation (Seated or Kneeling)",
                setsReps: "2 sets of 10-12 reps per side",
                howTo: "**Seated:** Sit upright, feet flat. Place hands behind your head or cross arms over chest. Gently rotate your torso to one side, leading with your upper back and shoulder. Return to center and rotate to the other side. **Kneeling (on all fours):** Place one hand behind your head. Rotate your upper back, lifting your elbow towards the ceiling. Return with control.",
                why: "Improves rotation in the upper back, which is often stiff from sitting, directly helping with chest and neck tension.",
                imagePrompt: "A male person performing a seated thoracic spine rotation. Full body shot, gym setting.",
            },
            {
                name: "Chest Opener (Foam Roller or Doorway)",
                setsReps: "2 sets of 30s hold",
                howTo: "**Foam Roller:** Lie lengthwise on a foam roller, arms out to the sides. **Doorway:** Stand in a doorway, forearms on frame, lean gently forward.",
                why: "Opens up the chest and shoulders, counteracting rounded posture and relieving tension.",
                imagePrompt: "A male person performing a chest opener stretch using a foam roller. Full body shot, gym setting.",
            },
        ],
    },
    day1: {
        title: "Day 1: Full Body Gym Day 1",
        subtitle: "(Focus on Quadriceps Loading & Hip Strength)",
        exercises: [
            {
                name: "Knee Extension Machine",
                setsReps: "3 sets of 12 reps, 3s hold at top",
                howTo: "Set up the seat length, the height and leg supports to suit. With the lower pads on your lower shins gently extend and straighten your legs. Pause briefly at the top of the movement and then lower the legs back down in a slow and controlled manner. *ADJUST WEIGHT AND REPS TO WORK THROUGH COMFORTABLE RANGE ONLY*",
                why: "Directly targets quadriceps, crucial for tendinopathy recovery through controlled loading. The 3s hold increases time under tension.",
                note: "Start with 8kg, adjust to comfortable range only, no aggravation of pain.",
                imagePrompt: "A male person performing knee extensions on a machine in a gym. Full body shot, clear focus on leg movement.",
            },
            {
                name: "Box Squat with Chair - weights",
                setsReps: "3 sets of 12 reps",
                howTo: "Put a chair behind you and take a very wide step to the side. Hold some weights on your shoulders. Push your hips back behind you, as you try and sit down into the chair. Counterbalance this by leaning your chest forwards, keeping your back straight. Stand up, ensuring your knees travel forwards over your toes the whole time. *ADJUST WEIGHT AND REPS TO WORK THROUGH COMFORTABLE RANGE ONLY*",
                why: "Builds lower body strength and reinforces proper squat mechanics. The chair provides a depth target and confidence.",
                imagePrompt: "A male person performing a box squat with a chair and holding weights on their shoulders. Full body shot, gym setting.",
            },
            {
                name: "Hip Abduction Machine",
                setsReps: "3 sets of 12 reps",
                howTo: "Sit on the machine. Ensure the knee pads are facing inwards towards each other. Push your knees apart. *ADJUST WEIGHT AND REPS TO WORK THROUGH COMFORTABLE RANGE ONLY*",
                why: "Strengthens outer hip muscles (gluteus medius/minimus), important for hip stability and reducing hip soreness.",
                imagePrompt: "A male person using a hip abduction machine, pushing knees apart. Full body shot, gym setting.",
            },
            {
                name: "Side Lunges (Lateral Lunges)",
                setsReps: "3 sets of 10-12 reps per leg",
                howTo: "Stand with feet hip-width apart. Take a large step out to the side with one leg, keeping that foot pointed forward. As you step, bend the knee of the stepping leg, pushing your hips back as if sitting in a chair, while keeping the other leg straight. Your torso should stay relatively upright. Push off the stepping leg to return to the starting position. You can hold a dumbbell in each hand or a single dumbbell goblet-style for added resistance.",
                why: "A fantastic compound exercise that works the inner thighs (adductors) as well as the glutes, hamstrings, and quads. It's a functional movement that improves hip mobility and strengthens the entire lower body, with a strong emphasis on the adductors.",
                imagePrompt: "A male person performing a side lunge (lateral lunge) with good form, stretching one leg out to the side while bending the other knee. Full body shot, gym setting.",
            },
            {
                name: "Seated Cable Row",
                setsReps: "3 sets of 10-12 reps",
                howTo: "Sit at a cable row machine with feet on the footplate, knees slightly bent. Grab the handle with an overhand grip. Keeping your back straight and chest up, pull the handle towards your lower abdomen, squeezing your shoulder blades together. Slowly extend arms back to starting position.",
                why: "Strengthens mid and upper back, improving posture and counteracting rounded shoulders from desk work.",
                imagePrompt: "A male person performing a seated cable row with proper form. Full body shot, gym setting.",
            },
            {
                name: "Dumbbell Bench Press",
                setsReps: "3 sets of 8-12 reps",
                howTo: "Lie on a flat bench with a dumbbell in each hand, palms facing each other or forward. Lower the dumbbells slowly to the sides of your chest. Press them back up towards the ceiling, fully extending your arms without locking elbows.",
                why: "Upper body pushing strength.",
                imagePrompt: "A male person performing a dumbbell bench press on a flat bench. Full body shot, gym setting.",
            },
        ],
    },
    day2: {
        title: "Day 2: At-Home Bodyweight & Mobility Day",
        subtitle: "(Focus on Core, Hips & Flexibility)",
        exercises: [
            {
                name: "Bridge with Resisted Hip Abduction",
                setsReps: "3 sets of 12 reps",
                howTo: "Place a resistance band loop (red resistance band) around both thighs, just above your knees. Lie on your back with your knees bent and feet flat on the floor. Place legs hips width apart so that there is tension in the band. Raise your hips up into a bridge, keeping the knees hips width apart. Control the movement back down to the start position, maintaining constant tension on the band.",
                why: "Combines glute activation with hip abductor work, excellent for hip stability and inner/outer thigh balance.",
                imagePrompt: "A male person performing a glute bridge with a resistance band around their thighs. Full body shot, home gym setting.",
            },
            {
                name: "Clam Shells",
                setsReps: "3 sets of 15 reps per side, 3s hold at top",
                howTo: "Lie on your side with your feet, ankles and knees together. Bend the legs a little and tighten your core stability muscles. Keeping the feet together, lift the top knee up. Make sure you don't roll your body back with the movement. Control the movement as you bring the knee back down to the starting position. *BOTH SIDES*",
                why: "Isolates and strengthens hip abductors and external rotators, crucial for hip stability and knee health.",
                imagePrompt: "A male person performing clam shells on their side with knees bent. Full body shot, home gym setting.",
            },
            {
                name: "Bird-Dog",
                setsReps: "3 sets of 10-12 reps per side",
                howTo: "Start on all fours with hands under shoulders and knees under hips. Engage your core, then slowly extend your right arm forward and your left leg straight back simultaneously, keeping your back flat and hips level. Hold briefly, then return to start. Alternate sides.",
                why: "Core stability without direct abdominal pressure, good for back health.",
                imagePrompt: "A male person performing a bird-dog exercise on a mat. Full body shot, home gym setting.",
            },
            {
                name: "Cat-Cow Stretch",
                setsReps: "3 sets of 10-12 reps",
                howTo: "Start on all fours. For \"Cat,\" round your spine towards the ceiling, tucking your chin to your chest. For \"Cow,\" arch your back, dropping your belly towards the floor, lifting your head and tailbone. Flow smoothly between these two positions.",
                why: "Improves spinal mobility, beneficial for desk posture.",
                imagePrompt: "A male person performing a cat-cow stretch on a mat. Full body shot, home gym setting.",
            },
            {
                name: "Bodyweight Squats",
                setsReps: "3 sets of 12-15 reps",
                howTo: "Stand with feet shoulder-width apart, toes slightly out. Lower your hips down as if sitting in a chair, keeping your chest up and back straight. Go as deep as comfortable, then push through your heels to return to standing.",
                why: "Fundamental movement, reinforces proper squat pattern without external load.",
                imagePrompt: "A male person performing a bodyweight squat with proper form. Full body shot, home gym setting.",
            },
            {
                name: "Push-ups (or Incline Push-ups)",
                setsReps: "3 sets of AMRAP",
                howTo: "Start in a plank position, hands slightly wider than shoulder-width. Lower your chest towards the floor by bending your elbows. Keep your body in a straight line from head to heels. Push back up to the starting position. For incline push-ups, place hands on an elevated surface like a sturdy chair or table.",
                why: "Bodyweight upper body strength and core stability.",
                imagePrompt: "A male person performing a push-up with proper form. Full body shot, home gym setting.",
            },
        ],
    },
    day3: {
        title: "Day 3: Full Body Gym Day 2",
        subtitle: "(Focus on Posterior Chain, Unilateral & Upper Body)",
        exercises: [
            {
                name: "Lunge - weights",
                setsReps: "2 sets of 12 reps per leg",
                howTo: "Hold the weights down by your side and step forwards on to the affected leg. Lunge straight down, bending both knees to 90 degrees, dropping your back knee towards the floor. Press back up and repeat this exercise. Make sure your front knee travels directly forwards over your toes. *ADJUST WEIGHT AND REPS TO WORK THROUGH COMFORTABLE RANGE ONLY*",
                why: "Unilateral leg strength, addresses imbalances, and provides controlled loading for the quadriceps.",
                note: "Start with 6kg, adjust to comfortable range only, no aggravation of pain.",
                imagePrompt: "A male person performing a lunge with weights in a gym. Full body shot, clear focus on form.",
            },
            {
                name: "Romanian Deadlift (RDL) with Dumbbells",
                setsReps: "3 sets of 10-12 reps",
                howTo: "Stand with feet hip-width apart, holding dumbbells in front of your thighs. Keep a slight bend in your knees. Hinge at your hips, lowering the dumbbells towards the floor while keeping your back straight. Feel the stretch in your hamstrings. Return to standing by squeezing your glutes and extending your hips.",
                why: "Strengthens hamstrings, glutes, and lower back, crucial for counteracting desk posture. Focus on hip hinge.",
                imagePrompt: "A male person performing a Romanian Deadlift (RDL) with dumbbells. Full body shot, gym setting.",
            },
            {
                name: "Leg Press",
                setsReps: "3 sets of 10-15 reps",
                howTo: "Sit on the leg press machine with your feet shoulder-width apart on the footplate. Release the safety catches. Lower the platform by bending your knees until your thighs are close to your chest. Push the platform back up by extending your legs, without locking your knees at the top.",
                why: "Safe and effective way to build lower body strength with good control, allowing for quad loading.",
                imagePrompt: "A male person performing a leg press on a machine. Full body shot, gym setting.",
            },
            {
                name: "Face Pulls",
                setsReps: "3 sets of 12-15 reps",
                howTo: "Attach a rope handle to a high pulley on a cable machine. Grab the rope with an overhand grip, step back to create tension. Pull the rope towards your face, flaring your elbows out to the sides, squeezing your upper back muscles. Slowly extend your arms back to the start.",
                why: "Targets rear deltoids and upper back, excellent for posture and shoulder health, addressing left-sided tension.",
                imagePrompt: "A male person performing face pulls with a rope attachment. Full body shot, gym setting.",
            },
            {
                name: "Dumbbell Rows (Single Arm)",
                setsReps: "3 sets of 8-12 reps per arm",
                howTo: "Place one hand and one knee on a flat bench, keeping your back flat and parallel to the floor. Hold a dumbbell in your free hand, letting it hang straight down. Pull the dumbbell up towards your chest, squeezing your shoulder blade. Lower the dumbbell slowly with control. Complete reps on one side before switching.",
                why: "Unilateral back strength, helps address left-sided imbalances and tension.",
                imagePrompt: "A male person performing a single arm dumbbell row on a bench. Full body shot, gym setting.",
            },
            {
                name: "Dumbbell Shoulder Press (Seated or Standing)",
                setsReps: "3 sets of 8-12 reps",
                howTo: "Sit or stand with a dumbbell in each hand, at shoulder height, palms facing forward or each other. Press the dumbbells directly overhead until your arms are fully extended. Slowly lower the dumbbells back to shoulder height with control.",
                why: "Builds shoulder strength.",
                imagePrompt: "A male person performing a dumbbell shoulder press. Full body shot, gym setting.",
            },
        ],
    },
};

// --- ExerciseCard Component ---
// Displays a single exercise with its details and a generated image.
const ExerciseCard = ({ exercise, onToggleComplete, isCompleted }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const generateImage = async (prompt) => {
            setLoading(true);
            setError(false);
            try {
                const payload = { instances: { prompt: prompt }, parameters: { "sampleCount": 1 } };
                const apiKey = ""; // Canvas will automatically provide this at runtime
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`API Error: ${response.status} - ${errorText}`);
                    setError(true);
                    return;
                }

                const result = await response.json();

                if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
                    const url = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
                    setImageUrl(url);
                } else {
                    console.error("Image generation failed or unexpected response structure:", result);
                    setError(true);
                }
            } catch (err) {
                console.error("Error generating image:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (exercise.imagePrompt) {
            generateImage(exercise.imagePrompt);
        } else {
            setLoading(false);
        }
    }, [exercise.imagePrompt]);

    return (
        <div className={`exercise-card p-4 rounded-xl shadow-md ${isCompleted ? 'bg-green-100 border-green-400' : 'bg-white border-gray-200'} border transition-all duration-300`}>
            <div className="flex items-center justify-between mb-2">
                <span className="flex items-center text-lg font-semibold text-gray-800">
                    <svg className="h-6 w-6 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 14V2m-5 7H11a4 4 0 0 1 4 4v3a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-3a4 4 0 0 1 4-4h4"></path><path d="M15 14a4 4 0 0 0 4 4v3a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-3a4 4 0 0 0 4-4"></path></svg>
                    {exercise.name} <span className="ml-2 text-sm font-normal text-gray-600">({exercise.setsReps})</span>
                </span>
                <button
                    onClick={() => onToggleComplete(exercise.name)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${isCompleted ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} transition-colors duration-200`}
                >
                    {isCompleted ? 'Completed!' : 'Mark Complete'}
                </button>
            </div>
            <div className="text-gray-700 text-sm">
                {loading ? (
                    <p className="text-center text-blue-500 py-4">Generating image for {exercise.name}...</p>
                ) : error ? (
                    <img src={`https://placehold.co/400x200/FFCCCC/CC0000?text=Image+Failed+for+${encodeURIComponent(exercise.name)}`} alt={`Error loading image for ${exercise.name}`} className="w-full h-48 object-contain my-2 rounded-lg border border-gray-300"/>
                ) : (
                    <img src={imageUrl} alt={`Illustration of ${exercise.name}`} className="w-full h-48 object-contain my-2 rounded-lg border border-gray-300"/>
                )}
                <p className="mt-2"><strong>How to do it:</strong> {exercise.howTo}</p>
                <p className="mt-1"><strong>Why:</strong> {exercise.why}</p>
                {exercise.note && (
                    <p className="mt-1 text-red-600"><strong>Note:</strong> {exercise.note}</p>
                )}
            </div>
        </div>
    );
};

// --- App Component ---
// The main application component handling navigation and displaying workout days.
const App = () => {
    const [currentView, setCurrentView] = useState('general'); // 'general', 'warmup', 'day1', 'day2', 'day3', 'coolDown'
    const [completedExercises, setCompletedExercises] = useState({}); // { 'exerciseName': true/false }

    // Reset completed exercises when changing day views
    useEffect(() => {
        setCompletedExercises({});
    }, [currentView]);

    const handleToggleComplete = (exerciseName) => {
        setCompletedExercises(prev => ({
            ...prev,
            [exerciseName]: !prev[exerciseName]
        }));
    };

    const renderContent = () => {
        switch (currentView) {
            case 'general':
                return (
                    <div className="space-y-8">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg" role="alert">
                            <p className="font-semibold mb-2">Important Disclaimer:</p>
                            <p dangerouslySetInnerHTML={{ __html: regimeData.general.disclaimer }}></p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-700 section-title">General Principles</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            {regimeData.general.principles.map((principle, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: principle }}></li>
                            ))}
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-700 section-title">Weekly Schedule</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
                            {regimeData.general.schedule.map((day, index) => (
                                <div key={index} className={`p-4 rounded-lg shadow-sm ${index % 2 === 0 ? 'bg-blue-50' : 'bg-green-50'}`}>
                                    <p dangerouslySetInnerHTML={{ __html: day }}></p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-700 section-title">{regimeData.general.concerns.title}</h2>
                        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                            {regimeData.general.concerns.items.map((concern, index) => (
                                <div key={index} className="mb-4 last:mb-0">
                                    <h3 className="font-semibold text-gray-700">{concern.heading}</h3>
                                    <p className="text-sm text-gray-700">{concern.details}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-700 section-title">{regimeData.general.progression.title}</h2>
                        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                            <ul className="list-disc list-inside text-sm space-y-1">
                                {regimeData.general.progression.items.map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case 'warmup':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-700 section-title">{regimeData.warmup.title}</h2>
                        <p className="text-gray-700 mb-4">{regimeData.warmup.description}</p>
                        {regimeData.warmup.exercises.map((exercise, index) => (
                            <ExerciseCard
                                key={index}
                                exercise={exercise}
                                onToggleComplete={handleToggleComplete}
                                isCompleted={completedExercises[exercise.name]}
                            />
                        ))}
                    </div>
                );
            case 'day1':
            case 'day2':
            case 'day3':
                const dayData = regimeData[currentView];
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-700 section-title">{dayData.title}</h2>
                        <p className="text-gray-700 mb-4">{dayData.subtitle}</p>
                        {dayData.exercises.map((exercise, index) => (
                            <ExerciseCard
                                key={index}
                                exercise={exercise}
                                onToggleComplete={handleToggleComplete}
                                isCompleted={completedExercises[exercise.name]}
                            />
                        ))}
                    </div>
                );
            case 'coolDown':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-700 section-title">{regimeData.coolDown.title}</h2>
                        <p className="text-gray-700 mb-4">{regimeData.coolDown.description}</p>
                        {regimeData.coolDown.exercises.map((exercise, index) => (
                            <ExerciseCard
                                key={index}
                                exercise={exercise}
                                onToggleComplete={handleToggleComplete}
                                isCompleted={completedExercises[exercise.name]}
                            />
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
                {/* Navigation Buttons */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
                    <button
                        onClick={() => setCurrentView('general')}
                        className={`px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-colors duration-200 ${currentView === 'general' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        General Info
                    </button>
                    <button
                        onClick={() => setCurrentView('warmup')}
                        className={`px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-colors duration-200 ${currentView === 'warmup' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Warm-up
                    </button>
                    <button
                        onClick={() => setCurrentView('day1')}
                        className={`px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-colors duration-200 ${currentView === 'day1' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Day 1 (Gym)
                    </button>
                    <button
                        onClick={() => setCurrentView('day2')}
                        className={`px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-colors duration-200 ${currentView === 'day2' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Day 2 (Home)
                    </button>
                    <button
                        onClick={() => setCurrentView('day3')}
                        className={`px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-colors duration-200 ${currentView === 'day3' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Day 3 (Gym)
                    </button>
                    <button
                        onClick={() => setCurrentView('coolDown')}
                        className={`px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-colors duration-200 ${currentView === 'coolDown' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Cool-down
                    </button>
                </div>

                {renderContent()}
            </div>
        </div>
    );
};

export default App;
